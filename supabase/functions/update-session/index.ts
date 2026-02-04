import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { session_id, page_path, ended_at, duration_seconds, max_scroll_depth } = await req.json();

    // Validate required fields
    if (!session_id || !page_path) {
      return new Response(
        JSON.stringify({ error: "session_id and page_path are required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Create Supabase client with service role for secure updates
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Build update object - only include provided fields
    const updateData: Record<string, unknown> = {};
    if (ended_at !== undefined) updateData.ended_at = ended_at;
    if (duration_seconds !== undefined) updateData.duration_seconds = duration_seconds;
    if (max_scroll_depth !== undefined) updateData.max_scroll_depth = max_scroll_depth;

    if (Object.keys(updateData).length === 0) {
      return new Response(
        JSON.stringify({ error: "No update fields provided" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Update only the specific session matching both session_id and page_path
    // This ensures clients can only update their own sessions
    const { data, error } = await supabase
      .from("page_sessions")
      .update(updateData)
      .eq("session_id", session_id)
      .eq("page_path", page_path)
      .is("ended_at", null)
      .select();

    if (error) {
      console.error("Error updating session:", error);
      return new Response(
        JSON.stringify({ error: "Failed to update session" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ success: true, updated: data?.length || 0 }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

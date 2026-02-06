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
    const {
      session_id,
      page_path,
      referrer,
      device_type,
      started_at,
      utm_source,
      utm_medium,
      utm_campaign,
      utm_term,
      utm_content,
      browser,
      os,
      screen_width,
      screen_height,
      viewport_width,
      viewport_height,
    } = await req.json();

    // Validate required fields
    if (!session_id || !page_path) {
      return new Response(
        JSON.stringify({ error: "session_id and page_path are required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Create Supabase client with service role for secure inserts
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Insert page session
    const { data, error } = await supabase.from("page_sessions").insert({
      session_id,
      page_path,
      referrer: referrer || null,
      device_type: device_type || null,
      started_at: started_at || new Date().toISOString(),
      utm_source: utm_source || null,
      utm_medium: utm_medium || null,
      utm_campaign: utm_campaign || null,
      utm_term: utm_term || null,
      utm_content: utm_content || null,
      browser: browser || null,
      os: os || null,
      screen_width: screen_width || null,
      screen_height: screen_height || null,
      viewport_width: viewport_width || null,
      viewport_height: viewport_height || null,
    }).select();

    if (error) {
      console.error("Error creating session:", error);
      return new Response(
        JSON.stringify({ error: "Failed to create session" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ success: true, id: data?.[0]?.id }),
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

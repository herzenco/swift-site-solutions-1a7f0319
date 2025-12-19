import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface LeadData {
  id?: string;
  full_name: string;
  email: string;
  phone?: string | null;
  website?: string | null;
  source?: string | null;
  notes?: string | null;
  industry?: string | null;
  lead_score?: number | null;
  qualification_status?: string | null;
  created_at?: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const webhookUrl = Deno.env.get("ZAPIER_WEBHOOK_URL");
    
    if (!webhookUrl) {
      console.error("ZAPIER_WEBHOOK_URL is not configured");
      return new Response(
        JSON.stringify({ success: false, error: "Zapier webhook URL not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const leadData: LeadData = await req.json();
    
    console.log("Sending lead to Zapier:", leadData.email);

    // Send to Zapier webhook
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...leadData,
        timestamp: new Date().toISOString(),
        source_app: "Xyren Website",
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Zapier webhook error:", response.status, errorText);
      return new Response(
        JSON.stringify({ success: false, error: `Zapier returned ${response.status}` }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log("Successfully sent lead to Zapier");

    return new Response(
      JSON.stringify({ success: true, message: "Lead sent to Zapier" }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error sending to Zapier:", error);
    return new Response(
      JSON.stringify({ success: false, error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

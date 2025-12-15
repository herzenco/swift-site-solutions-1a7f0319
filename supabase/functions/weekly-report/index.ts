import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { Resend } from "https://esm.sh/resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface Lead {
  id: string;
  full_name: string;
  email: string;
  phone: string | null;
  website: string | null;
  notes: string | null;
  source: string | null;
  created_at: string;
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const getSourceLabel = (source: string | null): string => {
  const labels: Record<string, string> = {
    hero_modal: "Hero Modal",
    project_plan_modal: "Project Plan",
    real_estate_page: "Real Estate",
    professional_services_page: "Law Firms",
    home_services_page: "Home Services",
    education_coaching_page: "Education & Coaching",
  };
  return source ? labels[source] || source : "Unknown";
};

const handler = async (req: Request): Promise<Response> => {
  console.log("Weekly report function triggered");

  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Initialize Supabase client
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Calculate date range (last 7 days)
    const now = new Date();
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    // Fetch all leads
    const { data: allLeads, error: leadsError } = await supabase
      .from("leads")
      .select("*")
      .order("created_at", { ascending: false });

    if (leadsError) {
      console.error("Error fetching leads:", leadsError);
      throw leadsError;
    }

    const leads = allLeads as Lead[];
    console.log(`Fetched ${leads.length} total leads`);

    // Calculate analytics
    const totalLeads = leads.length;
    const thisWeekLeads = leads.filter((lead) => new Date(lead.created_at) >= weekAgo);
    const thisWeekCount = thisWeekLeads.length;

    // Leads by source
    const leadsBySource = leads.reduce((acc, lead) => {
      const source = lead.source || "unknown";
      acc[source] = (acc[source] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // This week by source
    const thisWeekBySource = thisWeekLeads.reduce((acc, lead) => {
      const source = lead.source || "unknown";
      acc[source] = (acc[source] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Generate leads table HTML
    const leadsTableRows = thisWeekLeads
      .map(
        (lead) => `
        <tr style="border-bottom: 1px solid #e5e7eb;">
          <td style="padding: 12px; text-align: left;">${lead.full_name}</td>
          <td style="padding: 12px; text-align: left;"><a href="mailto:${lead.email}" style="color: #0ea5e9;">${lead.email}</a></td>
          <td style="padding: 12px; text-align: left;">${lead.phone || "—"}</td>
          <td style="padding: 12px; text-align: left;">${getSourceLabel(lead.source)}</td>
          <td style="padding: 12px; text-align: left;">${formatDate(lead.created_at)}</td>
        </tr>
      `
      )
      .join("");

    // Generate source breakdown HTML
    const sourceBreakdownRows = Object.entries(leadsBySource)
      .sort(([, a], [, b]) => b - a)
      .map(
        ([source, count]) => `
        <tr style="border-bottom: 1px solid #e5e7eb;">
          <td style="padding: 8px 12px; text-align: left;">${getSourceLabel(source)}</td>
          <td style="padding: 8px 12px; text-align: right; font-weight: 600;">${count}</td>
          <td style="padding: 8px 12px; text-align: right; color: #6b7280;">${thisWeekBySource[source] || 0} this week</td>
        </tr>
      `
      )
      .join("");

    // Build email HTML
    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Weekly Leads Report</title>
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #1f2937; max-width: 800px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); color: white; padding: 32px; border-radius: 12px; margin-bottom: 24px;">
            <h1 style="margin: 0 0 8px 0; font-size: 28px;">Weekly Leads Report</h1>
            <p style="margin: 0; opacity: 0.8;">Xyren by Herzen Co. • ${formatDate(now.toISOString())}</p>
          </div>

          <div style="display: flex; gap: 16px; margin-bottom: 24px;">
            <div style="flex: 1; background: #f8fafc; border: 1px solid #e5e7eb; border-radius: 8px; padding: 20px; text-align: center;">
              <div style="font-size: 36px; font-weight: 700; color: #0ea5e9;">${totalLeads}</div>
              <div style="color: #6b7280; font-size: 14px;">Total Leads</div>
            </div>
            <div style="flex: 1; background: #f8fafc; border: 1px solid #e5e7eb; border-radius: 8px; padding: 20px; text-align: center;">
              <div style="font-size: 36px; font-weight: 700; color: #22c55e;">${thisWeekCount}</div>
              <div style="color: #6b7280; font-size: 14px;">This Week</div>
            </div>
            <div style="flex: 1; background: #f8fafc; border: 1px solid #e5e7eb; border-radius: 8px; padding: 20px; text-align: center;">
              <div style="font-size: 36px; font-weight: 700; color: #f59e0b;">${Object.keys(leadsBySource).length}</div>
              <div style="color: #6b7280; font-size: 14px;">Active Sources</div>
            </div>
          </div>

          <h2 style="font-size: 20px; margin: 32px 0 16px 0; color: #1f2937;">Leads by Source</h2>
          <table style="width: 100%; border-collapse: collapse; background: white; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden; margin-bottom: 32px;">
            <thead style="background: #f8fafc;">
              <tr>
                <th style="padding: 12px; text-align: left; font-weight: 600; color: #6b7280; font-size: 14px;">Source</th>
                <th style="padding: 12px; text-align: right; font-weight: 600; color: #6b7280; font-size: 14px;">Total</th>
                <th style="padding: 12px; text-align: right; font-weight: 600; color: #6b7280; font-size: 14px;">This Week</th>
              </tr>
            </thead>
            <tbody>
              ${sourceBreakdownRows || '<tr><td colspan="3" style="padding: 20px; text-align: center; color: #6b7280;">No leads yet</td></tr>'}
            </tbody>
          </table>

          <h2 style="font-size: 20px; margin: 32px 0 16px 0; color: #1f2937;">New Leads This Week (${thisWeekCount})</h2>
          ${
            thisWeekCount > 0
              ? `
            <table style="width: 100%; border-collapse: collapse; background: white; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden;">
              <thead style="background: #f8fafc;">
                <tr>
                  <th style="padding: 12px; text-align: left; font-weight: 600; color: #6b7280; font-size: 14px;">Name</th>
                  <th style="padding: 12px; text-align: left; font-weight: 600; color: #6b7280; font-size: 14px;">Email</th>
                  <th style="padding: 12px; text-align: left; font-weight: 600; color: #6b7280; font-size: 14px;">Phone</th>
                  <th style="padding: 12px; text-align: left; font-weight: 600; color: #6b7280; font-size: 14px;">Source</th>
                  <th style="padding: 12px; text-align: left; font-weight: 600; color: #6b7280; font-size: 14px;">Date</th>
                </tr>
              </thead>
              <tbody>
                ${leadsTableRows}
              </tbody>
            </table>
          `
              : '<p style="color: #6b7280; text-align: center; padding: 32px; background: #f8fafc; border-radius: 8px;">No new leads this week</p>'
          }

          <div style="margin-top: 32px; padding: 20px; background: #f8fafc; border-radius: 8px; text-align: center;">
            <p style="margin: 0; color: #6b7280; font-size: 14px;">
              This automated report is sent every Monday at 9:00 AM.
            </p>
          </div>
        </body>
      </html>
    `;

    // Send email
    console.log("Sending email to Herzen@herzenco.co");
    const emailResponse = await resend.emails.send({
      from: "Xyren Reports <onboarding@resend.dev>",
      to: ["Herzen@herzenco.co"],
      subject: `Weekly Leads Report - ${thisWeekCount} new leads this week`,
      html: emailHtml,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(
      JSON.stringify({
        success: true,
        message: "Weekly report sent successfully",
        stats: {
          totalLeads,
          thisWeekCount,
          sources: Object.keys(leadsBySource).length,
        },
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Error in weekly-report function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);

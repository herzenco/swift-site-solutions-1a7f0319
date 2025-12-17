import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const VERCEL_API_TOKEN = Deno.env.get("VERCEL_API_TOKEN");
    const VERCEL_PROJECT_ID = Deno.env.get("VERCEL_PROJECT_ID");
    const VERCEL_TEAM_ID = Deno.env.get("VERCEL_TEAM_ID");

    if (!VERCEL_API_TOKEN || !VERCEL_PROJECT_ID) {
      throw new Error("Vercel credentials not configured");
    }

    // Calculate date range (last 30 days)
    const now = new Date();
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    const from = thirtyDaysAgo.toISOString();
    const to = now.toISOString();

    // Build query params
    const baseParams = new URLSearchParams({
      projectId: VERCEL_PROJECT_ID,
      from,
      to,
      environment: "production",
    });

    if (VERCEL_TEAM_ID) {
      baseParams.set("teamId", VERCEL_TEAM_ID);
    }

    const headers = {
      Authorization: `Bearer ${VERCEL_API_TOKEN}`,
      "Content-Type": "application/json",
    };

    console.log("Fetching Vercel Analytics...");

    // Fetch page views data
    const pageViewsResponse = await fetch(
      `https://vercel.com/api/web/insights/stats/path?${baseParams.toString()}`,
      { headers }
    );

    // Fetch visitors data
    const visitorsResponse = await fetch(
      `https://vercel.com/api/web/insights/stats/visitor?${baseParams.toString()}`,
      { headers }
    );

    // Fetch referrers data (for bounce rate approximation)
    const referrersResponse = await fetch(
      `https://vercel.com/api/web/insights/stats/referrer?${baseParams.toString()}`,
      { headers }
    );

    // Fetch timeseries for chart data
    const timeseriesParams = new URLSearchParams(baseParams);
    timeseriesParams.set("interval", "day");
    
    const timeseriesResponse = await fetch(
      `https://vercel.com/api/web/insights/stats/path?${timeseriesParams.toString()}&timeseries=true`,
      { headers }
    );

    let pageViews = 0;
    let uniqueVisitors = 0;
    let bounceRate = 0;
    let chartData: Array<{ date: string; views: number; visitors: number }> = [];

    // Parse page views
    if (pageViewsResponse.ok) {
      const pvData = await pageViewsResponse.json();
      console.log("Page views response:", JSON.stringify(pvData).slice(0, 500));
      
      if (pvData.data && Array.isArray(pvData.data)) {
        pageViews = pvData.data.reduce((sum: number, item: any) => sum + (item.visitors || item.pageviews || 0), 0);
      } else if (pvData.pageviews !== undefined) {
        pageViews = pvData.pageviews;
      }
    } else {
      console.log("Page views error:", pageViewsResponse.status, await pageViewsResponse.text());
    }

    // Parse visitors
    if (visitorsResponse.ok) {
      const visitorData = await visitorsResponse.json();
      console.log("Visitors response:", JSON.stringify(visitorData).slice(0, 500));
      
      if (visitorData.data && Array.isArray(visitorData.data)) {
        uniqueVisitors = visitorData.data.length;
      } else if (visitorData.visitors !== undefined) {
        uniqueVisitors = visitorData.visitors;
      }
    } else {
      console.log("Visitors error:", visitorsResponse.status, await visitorsResponse.text());
    }

    // Parse referrers for bounce rate approximation
    if (referrersResponse.ok) {
      const refData = await referrersResponse.json();
      console.log("Referrers response:", JSON.stringify(refData).slice(0, 500));
      
      // Bounce rate approximation: direct visits tend to have higher bounce
      if (refData.data && Array.isArray(refData.data)) {
        const directVisits = refData.data.find((r: any) => r.key === "(direct)" || r.key === "Direct");
        const totalFromRef = refData.data.reduce((sum: number, r: any) => sum + (r.visitors || 0), 0);
        if (directVisits && totalFromRef > 0) {
          bounceRate = Math.round((directVisits.visitors / totalFromRef) * 40); // Rough approximation
        }
      }
    }

    // Parse timeseries for chart
    if (timeseriesResponse.ok) {
      const tsData = await timeseriesResponse.json();
      console.log("Timeseries response:", JSON.stringify(tsData).slice(0, 500));
      
      if (tsData.data && Array.isArray(tsData.data)) {
        chartData = tsData.data.map((item: any) => ({
          date: item.date || item.timestamp,
          views: item.pageviews || item.visitors || 0,
          visitors: item.visitors || 0,
        }));
      }
    }

    const result = {
      pageViews,
      uniqueVisitors,
      bounceRate,
      ctaClicks: 0, // Would need custom event tracking
      chartData,
      period: "30d",
    };

    console.log("Returning analytics:", result);

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Vercel analytics error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

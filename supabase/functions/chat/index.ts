import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SYSTEM_PROMPT = `You are a helpful assistant for Xyren by Herzen Co., a company that builds custom AI-powered websites delivered in 5-10 days.

## About Xyren
- We build custom websites with integrated AI tools and automation
- One-time setup fee: $2,000
- Monthly plans:
  - Core ($150/month): Hosting, monitoring, basic forms/scheduling
  - Active ($400/month): AI chat, automated email follow-ups, scheduling automation, CRM integration, conversion tracking
  - Optimized ($600/month): Everything in Active plus technical SEO monitoring, quarterly conversion optimization, enhanced analytics, priority support

## Our Process
1. Day 1: Discovery Call - We gather your requirements
2. Days 2-7: Design Draft + Feedback - We build while you review
3. Days 8-10: Adjust + Deliver - Final tweaks and launch

## What's Included
Custom responsive design, conversion-focused UX, AI chatbot setup, scheduling automation, lead capture forms, CRM integration, on-page SEO, speed optimization, analytics dashboard, training videos, ongoing support.

## Industries We Serve
Real Estate, Professional Services (law firms, consultants), Home Services (plumbers, contractors), Education & Coaching.

## Your Goal
1. Answer questions helpfully and accurately about our services
2. When appropriate, naturally ask for the visitor's name, email, and website URL to send them a free project plan
3. Be friendly, professional, and concise
4. If you don't know something, say so and offer to have our team follow up

When you've collected contact info (name, email, and optionally website URL), include this exact marker at the end of your message:
[LEAD_CAPTURED: name="<name>", email="<email>", website="<website or empty>"]

This marker will be processed by the system to save the lead - the user won't see it.`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Service temporarily unavailable. Please try again later." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      return new Response(JSON.stringify({ error: "Failed to get response" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (error) {
    console.error("Chat error:", error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

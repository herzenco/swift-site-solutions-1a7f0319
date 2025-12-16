import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

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

const WEBSITE_FEEDBACK_PROMPT = `You are a website expert for Xyren by Herzen Co. You've just analyzed a website's content. 

Provide EXACTLY 3 specific, actionable feedback points about their website. Focus on:
- Conversion optimization (CTAs, forms, lead capture)
- User experience and clarity
- Missing automation opportunities

Be direct, helpful, and specific to what you see in their content. Each point should be 1-2 sentences max.

Format your response like this:
Here are 3 quick insights about your website:

1. **[Topic]**: [Specific feedback]

2. **[Topic]**: [Specific feedback]

3. **[Topic]**: [Specific feedback]

Would you like me to explain any of these in more detail, or would you like to get a free project plan with recommendations?`;

// Detect if the message contains a URL
function extractUrl(text: string): string | null {
  const urlRegex = /(https?:\/\/[^\s]+)|([a-zA-Z0-9][-a-zA-Z0-9]*\.(?:com|net|org|io|co|dev|app|me|ai|xyz|info|biz|us|uk|ca|au|de|fr|es|it|nl|se|no|dk|fi|ch|at|be|pl|ru|jp|cn|in|br|mx|ar|cl|za|nz|sg|hk|kr|tw|my|ph|th|vn|id|tr|ae|sa|eg|il|ie|pt|cz|ro|hu|gr|bg|hr|sk|si|ee|lv|lt|ua|by|kz|uz|pk|bd|lk|np|mm|vn|la|kh|mn)[^\s]*)/gi;
  const matches = text.match(urlRegex);
  if (matches && matches.length > 0) {
    let url = matches[0];
    // Clean up the URL
    url = url.replace(/[.,!?;:'")\]}>]+$/, '');
    return url;
  }
  return null;
}

async function scrapeWebsite(url: string): Promise<{ success: boolean; content?: string; error?: string }> {
  try {
    const apiKey = Deno.env.get('FIRECRAWL_API_KEY');
    if (!apiKey) {
      console.error('FIRECRAWL_API_KEY not configured');
      return { success: false, error: 'Scraping not configured' };
    }

    let formattedUrl = url.trim();
    if (!formattedUrl.startsWith('http://') && !formattedUrl.startsWith('https://')) {
      formattedUrl = `https://${formattedUrl}`;
    }

    console.log('Scraping URL for feedback:', formattedUrl);

    const response = await fetch('https://api.firecrawl.dev/v1/scrape', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: formattedUrl,
        formats: ['markdown'],
        onlyMainContent: true,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Firecrawl error:', response.status, data);
      return { success: false, error: data.error || 'Failed to analyze website' };
    }

    const content = data.data?.markdown || data.markdown;
    if (!content) {
      return { success: false, error: 'Could not extract website content' };
    }

    console.log('Successfully scraped website, content length:', content.length);
    return { success: true, content };
  } catch (error) {
    console.error('Scrape error:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Failed to analyze website' };
  }
}

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

    // Check if the latest user message contains a URL
    const lastUserMessage = messages.filter((m: any) => m.role === 'user').pop();
    const detectedUrl = lastUserMessage ? extractUrl(lastUserMessage.content) : null;

    let systemPrompt = SYSTEM_PROMPT;
    let finalMessages = [...messages];

    // If URL detected, scrape and provide feedback
    if (detectedUrl) {
      console.log('URL detected in message:', detectedUrl);
      const scrapeResult = await scrapeWebsite(detectedUrl);

      if (scrapeResult.success && scrapeResult.content) {
        // Truncate content if too long
        const truncatedContent = scrapeResult.content.slice(0, 8000);
        
        systemPrompt = WEBSITE_FEEDBACK_PROMPT;
        finalMessages = [
          {
            role: 'user',
            content: `Here is the website content from ${detectedUrl}:\n\n${truncatedContent}\n\nPlease provide 3 specific feedback points.`
          }
        ];
        console.log('Providing website feedback for:', detectedUrl);
      } else {
        // If scraping failed, add context about the failure
        console.log('Scraping failed:', scrapeResult.error);
        finalMessages = [
          ...messages,
          {
            role: 'system',
            content: `Note: The user shared a URL (${detectedUrl}) but we couldn't analyze it (${scrapeResult.error}). Acknowledge this and offer to help in another way or ask them to make sure the URL is correct.`
          }
        ];
      }
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
          { role: "system", content: systemPrompt },
          ...finalMessages,
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

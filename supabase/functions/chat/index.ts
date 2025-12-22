import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Intent signal keywords for lead scoring
const INTENT_SIGNALS = {
  pricing: ["price", "pricing", "cost", "how much", "rate", "rates", "fee", "fees", "budget", "afford", "expensive", "cheap", "payment", "pay"],
  timeline: ["when", "timeline", "deadline", "how long", "how soon", "asap", "urgent", "rush", "quickly", "fast", "time frame", "start date", "launch"],
  urgency: ["need", "must", "asap", "urgent", "immediately", "right away", "as soon as possible", "quickly", "fast", "hurry"],
  specificService: ["website", "chatbot", "ai chat", "scheduling", "crm", "lead capture", "seo", "analytics", "automation"],
};

function detectIntentSignals(messages: Array<{ role: string; content: string }>): {
  pricing: boolean;
  timeline: boolean;
  urgency: boolean;
  specificService: boolean;
} {
  const userMessages = messages
    .filter((m) => m.role === "user")
    .map((m) => m.content.toLowerCase())
    .join(" ");

  return {
    pricing: INTENT_SIGNALS.pricing.some((kw) => userMessages.includes(kw)),
    timeline: INTENT_SIGNALS.timeline.some((kw) => userMessages.includes(kw)),
    urgency: INTENT_SIGNALS.urgency.some((kw) => userMessages.includes(kw)),
    specificService: INTENT_SIGNALS.specificService.some((kw) => userMessages.includes(kw)),
  };
}

const SYSTEM_PROMPT = `You are a helpful assistant for Xyren by Herzen Co., a company that builds custom AI-powered websites delivered in 5-10 days.

## About Xyren
- We build custom websites with integrated AI tools and automation
- One-time setup fee: $2,000
- Monthly plans:
  - Core ($150/month): Hosting, monitoring, basic forms/scheduling
  - Active ($400/month): AI chat, automated email follow-ups, scheduling automation, CRM integration, conversion tracking
  - Optimized ($600/month): Everything in Active plus technical SEO monitoring, quarterly conversion optimization, enhanced analytics, priority support

## Your Goal
1. Answer questions helpfully about our services
2. When appropriate, ask for name, email, and website URL to send a free project plan
3. Be friendly, professional, and concise

CRITICAL: If a user provides their name and email (like "John Smith john@email.com" or separate messages), respond with ONE short sentence thanking them and confirming you'll send the project plan. Nothing else. Example: "Thanks, John! I'll send your project plan shortly."

Then include this marker at the end (user won't see it):
[LEAD_CAPTURED: name="<name>", email="<email>", website="<website or empty>", audit="<10 words max summary>"]`;

const WEBSITE_FEEDBACK_PROMPT = `You're reviewing a website for a contractor or realtor. Give 3 simple observations.

Format:
1. [Simple observation about their site - what's wrong, not how to fix it]
2. [Simple observation about their site - what's wrong, not how to fix it]
3. [Simple observation about their site - what's wrong, not how to fix it]

Examples of good observations:
- "Your header text is a bit long"
- "Missing alt text on images hurts SEO"
- "No lead magnet to capture visitors"
- "Contact info is hard to find"
- "Photos could be higher quality"

End with: "I can put together a project plan for you — what's your name and email?"

RULES:
- Short, simple sentences (under 10 words each)
- Point out issues, don't explain how to fix them
- Friendly but professional tone
- No emojis, no hype
- Total response under 60 words

When user provides name/email, respond briefly: "Thanks [name]! I'll send your project plan shortly."`;

// Detect if the message contains a URL

type ExtractUrlOptions = {
  /** If false, only http(s) URLs will be treated as URLs (bare domains like example.com will be ignored). */
  allowBareDomains?: boolean;
};

function cleanUrl(url: string) {
  return url.replace(/[.,!?;:'")\]}>]+$/, "");
}

function extractUrl(text: string, options: ExtractUrlOptions = {}): string | null {
  const input = (text ?? "").trim();
  if (!input) return null;

  // 1) Always ignore emails so we don't scrape something like "gmail.com" from "john@gmail.com"
  const emailRegex = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi;
  const emails = [...input.matchAll(emailRegex)].map((m) => m[0].toLowerCase());
  const emailDomains = new Set(
    emails
      .map((e) => e.split("@")[1])
      .filter((d): d is string => Boolean(d))
  );

  // 2) Prefer explicit URLs
  const httpMatch = input.match(/https?:\/\/[^\s]+/i);
  if (httpMatch?.[0]) return cleanUrl(httpMatch[0]);

  // 3) Optionally allow bare domains (e.g. "example.com")
  const allowBareDomains = options.allowBareDomains ?? true;
  if (!allowBareDomains) return null;

  const tlds =
    "com|net|org|io|co|dev|app|me|ai|xyz|info|biz|us|uk|ca|au|de|fr|es|it|nl|se|no|dk|fi|ch|at|be|pl|ru|jp|cn|in|br|mx|ar|cl|za|nz|sg|hk|kr|tw|my|ph|th|vn|id|tr|ae|sa|eg|il|ie|pt|cz|ro|hu|gr|bg|hr|sk|si|ee|lv|lt|ua|by|kz|uz|pk|bd|lk|np|mm|la|kh|mn";
  const domainRegex = new RegExp(
    `[a-zA-Z0-9][-a-zA-Z0-9]*\\.(?:${tlds})(?:\\/[^\\s]*)?`,
    "gi"
  );

  for (const match of input.matchAll(domainRegex)) {
    const candidate = match[0];
    const idx = match.index ?? -1;

    // Skip if it looks like we matched the domain portion of an email
    const prevChar = idx > 0 ? input[idx - 1] : "";
    if (prevChar === "@") continue;
    if (emailDomains.has(candidate.toLowerCase())) continue;

    return cleanUrl(candidate);
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
    const { messages, message_count, skipLeadCapture, skipUrlExtraction } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    // Detect intent signals from conversation
    const intentSignals = detectIntentSignals(messages);
    console.log("Detected intent signals:", intentSignals, "Message count:", message_count);

    // Prevent accidental back-to-back scrapes (especially when user is replying with email/name).
    // After we've already given website feedback once, we only allow *explicit* http(s) URLs to trigger scraping.
    const hasWebsiteFeedback = Array.isArray(messages)
      ? messages.some(
          (m: any) =>
            m?.role === "assistant" &&
            typeof m.content === "string" &&
            m.content.includes("Here are 3 quick wins I spotted")
        )
      : false;

    // Check if the latest user message contains a URL (skip if explicitly told to)
    const lastUserMessage = messages.filter((m: any) => m.role === 'user').pop();
    const detectedUrl = (!skipUrlExtraction && lastUserMessage)
      ? extractUrl(lastUserMessage.content, { allowBareDomains: !hasWebsiteFeedback })
      : null;

    let systemPrompt = SYSTEM_PROMPT;
    let finalMessages = [...messages];
    let urlScraped = false;

    // If URL detected, scrape and provide feedback
    if (detectedUrl) {
      console.log('URL detected in message:', detectedUrl);
      const scrapeResult = await scrapeWebsite(detectedUrl);

      if (scrapeResult.success && scrapeResult.content) {
        // Truncate content if too long
        const truncatedContent = scrapeResult.content.slice(0, 8000);
        
        systemPrompt = WEBSITE_FEEDBACK_PROMPT;
        urlScraped = true;
        // Keep conversation history but add the scraped content context
        finalMessages = [
          ...messages.slice(0, -1), // Keep history except the URL message
          {
            role: 'user',
            content: `I'd like feedback on my website: ${detectedUrl}\n\n[Website content for analysis]:\n${truncatedContent}`
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

    // Add custom headers with scoring metadata
    const responseHeaders = {
      ...corsHeaders,
      "Content-Type": "text/event-stream",
      "X-Intent-Signals": JSON.stringify(intentSignals),
      "X-Message-Count": String(message_count || 0),
      "X-Url-Scraped": String(urlScraped),
      "X-Detected-Url": detectedUrl || "",
    };

    return new Response(response.body, { headers: responseHeaders });
  } catch (error) {
    console.error("Chat error:", error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

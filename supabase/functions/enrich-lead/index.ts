import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { leadId, url } = await req.json();

    if (!leadId || !url) {
      console.error('Missing leadId or url');
      return new Response(
        JSON.stringify({ success: false, error: 'leadId and url are required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const firecrawlKey = Deno.env.get('FIRECRAWL_API_KEY');
    const lovableApiKey = Deno.env.get('LOVABLE_API_KEY');
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

    if (!firecrawlKey || !lovableApiKey || !supabaseUrl || !supabaseServiceKey) {
      console.error('Missing required environment variables');
      return new Response(
        JSON.stringify({ success: false, error: 'Missing configuration' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Format URL
    let formattedUrl = url.trim();
    if (!formattedUrl.startsWith('http://') && !formattedUrl.startsWith('https://')) {
      formattedUrl = `https://${formattedUrl}`;
    }

    console.log('Enriching lead:', leadId, 'with URL:', formattedUrl);

    // Step 1: Scrape the website using Firecrawl
    let markdown = '';
    let metadata: any = {};
    let scrapeSucceeded = false;
    
    try {
      const scrapeResponse = await fetch('https://api.firecrawl.dev/v1/scrape', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${firecrawlKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url: formattedUrl,
          formats: ['markdown'],
          onlyMainContent: false, // Get full page to find contact info
        }),
      });

      const scrapeData = await scrapeResponse.json();

      if (scrapeResponse.ok && scrapeData.success) {
        markdown = scrapeData.data?.markdown || scrapeData.markdown || '';
        metadata = scrapeData.data?.metadata || scrapeData.metadata || {};
        scrapeSucceeded = true;
        console.log('Scraped content length:', markdown.length);
      } else {
        console.warn('Firecrawl could not scrape URL:', scrapeData.error || 'Unknown error');
        // Continue anyway - we'll just update what we can
      }
    } catch (scrapeError) {
      console.warn('Scrape failed, continuing without enrichment:', scrapeError);
    }

    // If scraping failed, just return success with no enrichment
    if (!scrapeSucceeded) {
      console.log('Scraping failed for lead:', leadId, '- skipping enrichment');
      return new Response(
        JSON.stringify({ 
          success: true, 
          message: 'Website could not be scraped, lead saved without enrichment',
          extracted: null,
          updated: {}
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Scraped content length:', markdown.length);

    // Step 2: Use AI to extract business information
    const extractionPrompt = `Analyze this website content and extract business information. Return a JSON object with these fields (use null if not found):

- phone: Business phone number (format as found, e.g., "(555) 123-4567" or "+1-555-123-4567")
- email: Business email address
- industry: The business industry/category. MUST be one of these exact values:
  - "Real Estate & Property Services"
  - "Home & Local Services"  
  - "Professional Services"
  - "Education & Coaching"
  - "Healthcare & Wellness"
  - "E-commerce & Retail"
  - "Technology & SaaS"
  - "Other"
- business_type: Brief description of what the business does (max 50 words)
- location: City, State/Country if found

Website URL: ${formattedUrl}
Website Title: ${metadata.title || 'Unknown'}

Content:
${markdown.slice(0, 8000)}`;

    const aiResponse = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${lovableApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: 'You are a business analyst that extracts structured information from website content. Always respond with valid JSON only, no markdown formatting.' },
          { role: 'user', content: extractionPrompt }
        ],
        tools: [
          {
            type: "function",
            function: {
              name: "extract_business_info",
              description: "Extract business information from website content",
              parameters: {
                type: "object",
                properties: {
                  phone: { type: "string", description: "Business phone number" },
                  email: { type: "string", description: "Business email address" },
                  industry: { 
                    type: "string", 
                    enum: [
                      "Real Estate & Property Services",
                      "Home & Local Services",
                      "Professional Services",
                      "Education & Coaching",
                      "Healthcare & Wellness",
                      "E-commerce & Retail",
                      "Technology & SaaS",
                      "Other"
                    ],
                    description: "Business industry category" 
                  },
                  business_type: { type: "string", description: "Brief description of the business" },
                  location: { type: "string", description: "Business location" }
                },
                required: ["industry"],
                additionalProperties: false
              }
            }
          }
        ],
        tool_choice: { type: "function", function: { name: "extract_business_info" } }
      }),
    });

    if (!aiResponse.ok) {
      const errorText = await aiResponse.text();
      console.error('AI API error:', aiResponse.status, errorText);
      
      if (aiResponse.status === 429) {
        return new Response(
          JSON.stringify({ success: false, error: 'Rate limit exceeded, please try again later' }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      if (aiResponse.status === 402) {
        return new Response(
          JSON.stringify({ success: false, error: 'AI credits exhausted' }),
          { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      return new Response(
        JSON.stringify({ success: false, error: 'Failed to analyze content' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const aiData = await aiResponse.json();
    console.log('AI response:', JSON.stringify(aiData));

    // Extract the tool call result
    let extractedInfo: any = {};
    
    try {
      const toolCall = aiData.choices?.[0]?.message?.tool_calls?.[0];
      if (toolCall?.function?.arguments) {
        extractedInfo = JSON.parse(toolCall.function.arguments);
      }
    } catch (parseError) {
      console.error('Error parsing AI response:', parseError);
    }

    console.log('Extracted info:', extractedInfo);

    // Step 3: Update the lead in Supabase
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // First, get the current lead to see what's missing
    const { data: currentLead, error: fetchError } = await supabase
      .from('leads')
      .select('phone, email, industry, notes')
      .eq('id', leadId)
      .single();

    if (fetchError) {
      console.error('Error fetching lead:', fetchError);
      return new Response(
        JSON.stringify({ success: false, error: 'Failed to fetch lead' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Build update object - only update fields that are currently empty
    const updateData: any = {};
    
    if (!currentLead.phone && extractedInfo.phone) {
      updateData.phone = extractedInfo.phone;
    }
    
    if (!currentLead.industry && extractedInfo.industry) {
      updateData.industry = extractedInfo.industry;
    }

    // Add enrichment info to notes
    const enrichmentNote = [
      extractedInfo.business_type ? `Business: ${extractedInfo.business_type}` : null,
      extractedInfo.location ? `Location: ${extractedInfo.location}` : null,
      extractedInfo.email && extractedInfo.email !== currentLead.email ? `Alt Email: ${extractedInfo.email}` : null,
    ].filter(Boolean).join(' | ');

    if (enrichmentNote) {
      const existingNotes = currentLead.notes || '';
      const separator = existingNotes ? '\n\n---\nEnriched from website:\n' : 'Enriched from website:\n';
      updateData.notes = existingNotes + separator + enrichmentNote;
    }

    // Only update if we have something to update
    if (Object.keys(updateData).length > 0) {
      const { error: updateError } = await supabase
        .from('leads')
        .update(updateData)
        .eq('id', leadId);

      if (updateError) {
        console.error('Error updating lead:', updateError);
        return new Response(
          JSON.stringify({ success: false, error: 'Failed to update lead' }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      console.log('Lead enriched successfully:', leadId, updateData);
    } else {
      console.log('No new information to update for lead:', leadId);
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        extracted: extractedInfo,
        updated: updateData
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error enriching lead:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to enrich lead';
    return new Response(
      JSON.stringify({ success: false, error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

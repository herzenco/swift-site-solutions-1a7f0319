-- Add lead scoring columns to leads table
ALTER TABLE public.leads 
ADD COLUMN IF NOT EXISTS lead_score integer DEFAULT 0,
ADD COLUMN IF NOT EXISTS qualification_status text DEFAULT 'cool',
ADD COLUMN IF NOT EXISTS intent_signals jsonb DEFAULT '{}',
ADD COLUMN IF NOT EXISTS engagement_depth integer DEFAULT 0;

-- Add index for faster filtering by score
CREATE INDEX IF NOT EXISTS idx_leads_lead_score ON public.leads(lead_score DESC);
CREATE INDEX IF NOT EXISTS idx_leads_qualification_status ON public.leads(qualification_status);
-- Add industry column to leads table for storing user's industry from chat flow
ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS industry TEXT;

-- Add comment for clarity
COMMENT ON COLUMN public.leads.industry IS 'Industry selected by user during chat flow';
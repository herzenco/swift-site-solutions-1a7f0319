-- Create leads table for form submissions
CREATE TABLE public.leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  website TEXT,
  notes TEXT,
  source TEXT DEFAULT 'hero_modal',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (public form)
CREATE POLICY "Anyone can submit a lead"
ON public.leads
FOR INSERT
WITH CHECK (true);

-- Only authenticated users (admin) can view leads
CREATE POLICY "Authenticated users can view leads"
ON public.leads
FOR SELECT
TO authenticated
USING (true);
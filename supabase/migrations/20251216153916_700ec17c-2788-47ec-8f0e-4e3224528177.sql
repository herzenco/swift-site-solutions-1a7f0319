-- Create table for tracking chat interactions
CREATE TABLE public.chat_interactions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  session_id TEXT NOT NULL,
  interaction_type TEXT NOT NULL, -- 'message', 'url_scraped', 'lead_captured'
  user_message TEXT,
  assistant_message TEXT,
  url_scraped TEXT,
  lead_id UUID REFERENCES public.leads(id),
  metadata JSONB
);

-- Enable Row Level Security
ALTER TABLE public.chat_interactions ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (for chat logging)
CREATE POLICY "Anyone can insert chat interactions"
ON public.chat_interactions
FOR INSERT
WITH CHECK (true);

-- Allow authenticated users to view interactions
CREATE POLICY "Authenticated users can view chat interactions"
ON public.chat_interactions
FOR SELECT
USING (true);

-- Create index for faster queries
CREATE INDEX idx_chat_interactions_session ON public.chat_interactions(session_id);
CREATE INDEX idx_chat_interactions_type ON public.chat_interactions(interaction_type);
CREATE INDEX idx_chat_interactions_created ON public.chat_interactions(created_at DESC);
-- Create table for tracking page visits and session duration
CREATE TABLE public.page_sessions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id TEXT NOT NULL,
  page_path TEXT NOT NULL,
  referrer TEXT,
  started_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  ended_at TIMESTAMP WITH TIME ZONE,
  duration_seconds INTEGER,
  device_type TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.page_sessions ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts for tracking (visitors aren't logged in)
CREATE POLICY "Allow anonymous page session inserts" 
ON public.page_sessions 
FOR INSERT 
WITH CHECK (true);

-- Allow anonymous updates for duration tracking
CREATE POLICY "Allow anonymous page session updates" 
ON public.page_sessions 
FOR UPDATE 
USING (true);

-- Only admins can read session data
CREATE POLICY "Only admins can view page sessions" 
ON public.page_sessions 
FOR SELECT 
USING (public.has_role(auth.uid(), 'admin'::app_role));

-- Create index for efficient queries
CREATE INDEX idx_page_sessions_started_at ON public.page_sessions(started_at DESC);
CREATE INDEX idx_page_sessions_session_id ON public.page_sessions(session_id);
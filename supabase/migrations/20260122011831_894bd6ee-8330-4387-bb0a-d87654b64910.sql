-- Create analytics_events table for comprehensive event tracking
CREATE TABLE IF NOT EXISTS public.analytics_events (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id TEXT NOT NULL,
  event_type TEXT NOT NULL, -- 'click', 'scroll', 'form_start', 'form_submit', 'video_play', etc.
  event_name TEXT NOT NULL, -- 'hero_cta_click', 'nav_link_click', 'scroll_25', etc.
  element_id TEXT, -- DOM element id if applicable
  element_text TEXT, -- Button text, link text, etc.
  page_path TEXT NOT NULL,
  metadata JSONB DEFAULT '{}'::jsonb, -- Additional context (scroll_depth, viewport, etc.)
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.analytics_events ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (for tracking)
CREATE POLICY "Anyone can insert analytics events"
ON public.analytics_events
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Only admins can view analytics
CREATE POLICY "Only admins can view analytics events"
ON public.analytics_events
FOR SELECT
USING (has_role(auth.uid(), 'admin'::app_role));

-- Add indexes for common queries
CREATE INDEX idx_analytics_events_session ON public.analytics_events(session_id);
CREATE INDEX idx_analytics_events_type ON public.analytics_events(event_type);
CREATE INDEX idx_analytics_events_created ON public.analytics_events(created_at DESC);
CREATE INDEX idx_analytics_events_page ON public.analytics_events(page_path);

-- Add UTM tracking columns to page_sessions
ALTER TABLE public.page_sessions 
ADD COLUMN IF NOT EXISTS utm_source TEXT,
ADD COLUMN IF NOT EXISTS utm_medium TEXT,
ADD COLUMN IF NOT EXISTS utm_campaign TEXT,
ADD COLUMN IF NOT EXISTS utm_term TEXT,
ADD COLUMN IF NOT EXISTS utm_content TEXT,
ADD COLUMN IF NOT EXISTS country TEXT,
ADD COLUMN IF NOT EXISTS city TEXT,
ADD COLUMN IF NOT EXISTS browser TEXT,
ADD COLUMN IF NOT EXISTS os TEXT,
ADD COLUMN IF NOT EXISTS screen_width INTEGER,
ADD COLUMN IF NOT EXISTS screen_height INTEGER,
ADD COLUMN IF NOT EXISTS viewport_width INTEGER,
ADD COLUMN IF NOT EXISTS viewport_height INTEGER,
ADD COLUMN IF NOT EXISTS max_scroll_depth INTEGER DEFAULT 0;
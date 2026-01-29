-- Drop the overly permissive UPDATE policy
DROP POLICY IF EXISTS "Allow anonymous page session updates" ON public.page_sessions;

-- Create a more restrictive UPDATE policy
-- Only allow updates to sessions where ended_at is NULL (open sessions)
-- This prevents manipulation of already-closed sessions
CREATE POLICY "Allow updates only to open sessions"
ON public.page_sessions
FOR UPDATE
USING (ended_at IS NULL)
WITH CHECK (ended_at IS NOT NULL OR duration_seconds IS NOT NULL OR max_scroll_depth IS NOT NULL);
-- Remove the vulnerable UPDATE policy that allows any anonymous user to update any open session
DROP POLICY IF EXISTS "Allow updates only to open sessions" ON public.page_sessions;

-- Add a restrictive UPDATE policy that only allows admins to update sessions
-- Anonymous session updates are now handled securely via the update-session edge function
CREATE POLICY "Only admins can update page sessions"
ON public.page_sessions
FOR UPDATE
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));
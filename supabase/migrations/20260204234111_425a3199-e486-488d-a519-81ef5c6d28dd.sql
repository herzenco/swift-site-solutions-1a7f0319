-- Add explicit deny SELECT policy for anonymous users on leads table
-- This provides defense-in-depth alongside the existing admin-only SELECT policy
CREATE POLICY "Deny anonymous access to leads"
ON public.leads
FOR SELECT
TO anon
USING (false);
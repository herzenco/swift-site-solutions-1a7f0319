-- Grant permissions to anon role for lead submission (public facing form)
GRANT INSERT ON public.leads TO anon;

-- Ensure authenticated users can also insert leads (from chat widget when logged in)
GRANT INSERT ON public.leads TO authenticated;
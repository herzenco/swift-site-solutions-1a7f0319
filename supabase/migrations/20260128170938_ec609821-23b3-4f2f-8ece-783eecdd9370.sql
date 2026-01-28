-- Add dedicated questionnaire_answers column for Project Plan form responses
ALTER TABLE public.leads 
ADD COLUMN questionnaire_answers JSONB DEFAULT '{}'::jsonb;

-- Add a comment for documentation
COMMENT ON COLUMN public.leads.questionnaire_answers IS 'Structured questionnaire responses from Project Plan modal (businessType, primaryGoal, hasWebsite, biggestChallenge, timeline, preference)';
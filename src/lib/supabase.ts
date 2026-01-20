// Custom Supabase client pointing to the Dashboard project's backend
// This overrides the auto-generated client to connect to the shared backend

import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/integrations/supabase/types';

const SUPABASE_URL = 'https://lyawgllawtjtdtqjnhjy.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx5YXdnbGxhd3RqdGR0cWpuaGp5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg5MTc2NTIsImV4cCI6MjA4NDQ5MzY1Mn0.qbYRqeZvdT3K7K5rMg-U7vrNeiMrZA1uaiJPIByjmhw';

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  }
});

// Export the URL for edge function calls
export const SUPABASE_FUNCTIONS_URL = `${SUPABASE_URL}/functions/v1`;

import { supabase } from "@/lib/supabase";

interface LeadData {
  id?: string;
  full_name: string;
  email: string;
  phone?: string | null;
  website?: string | null;
  source?: string | null;
  notes?: string | null;
  industry?: string | null;
  lead_score?: number | null;
  qualification_status?: string | null;
  created_at?: string;
}

export const sendLeadToZapier = async (leadData: LeadData): Promise<void> => {
  try {
    console.log("Sending lead to Zapier:", leadData.email);
    
    const { data, error } = await supabase.functions.invoke("zapier-webhook", {
      body: leadData,
    });
    
    if (error) {
      console.error("Zapier webhook error:", error);
    } else {
      console.log("Lead sent to Zapier:", data);
    }
  } catch (err) {
    console.error("Failed to send lead to Zapier:", err);
  }
};

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronRight, Users, Loader2 } from "lucide-react";
import { format } from "date-fns";

interface Lead {
  id: string;
  full_name: string;
  email: string;
  phone: string | null;
  website: string | null;
  notes: string | null;
  source: string | null;
  created_at: string;
}

interface ProjectPlanLeadsTableProps {
  leads: Lead[];
  isLoading: boolean;
}

// Parse the notes string into key-value pairs
const parseNotes = (notes: string | null): Record<string, string> => {
  if (!notes) return {};
  
  const result: Record<string, string> = {};
  const lines = notes.split("\n");
  
  lines.forEach((line) => {
    const colonIndex = line.indexOf(":");
    if (colonIndex > 0) {
      const key = line.substring(0, colonIndex).trim();
      const value = line.substring(colonIndex + 1).trim();
      result[key] = value;
    }
  });
  
  return result;
};

// Extract website URL from parsed notes (it's stored in the "Has website" field)
const extractWebsiteUrl = (notes: string | null): string | null => {
  if (!notes) return null;
  
  const parsed = parseNotes(notes);
  const hasWebsite = parsed["Has website"] || "";
  
  // Check if there's a URL in parentheses
  const urlMatch = hasWebsite.match(/\(([^)]+)\)/);
  if (urlMatch) {
    return urlMatch[1];
  }
  
  return null;
};

const ExpandableRow = ({ lead }: { lead: Lead }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const parsedNotes = parseNotes(lead.notes);
  const websiteUrl = extractWebsiteUrl(lead.notes);

  const questionLabels: Record<string, string> = {
    "Business": "Business Type",
    "Goal": "Primary Goal",
    "Has website": "Current Website",
    "Challenge": "Biggest Challenge",
    "Timeline": "Timeline to Launch",
    "Preference": "What They Want",
  };

  return (
    <>
      <tr
        onClick={() => setIsExpanded(!isExpanded)}
        className="hover:bg-muted/30 transition-colors cursor-pointer"
      >
        <td className="px-6 py-4">
          <div className="flex items-center gap-2">
            {isExpanded ? (
              <ChevronDown className="w-4 h-4 text-muted-foreground" />
            ) : (
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            )}
            <span className="font-medium text-foreground">{lead.full_name}</span>
          </div>
        </td>
        <td className="px-6 py-4">
          <a
            href={`mailto:${lead.email}`}
            className="text-primary hover:underline"
            onClick={(e) => e.stopPropagation()}
          >
            {lead.email}
          </a>
        </td>
        <td className="px-6 py-4 text-sm text-muted-foreground max-w-[200px] truncate hidden sm:table-cell">
          {websiteUrl || "—"}
        </td>
        <td className="px-6 py-4 text-sm text-muted-foreground">
          {format(new Date(lead.created_at), "MMM d, yyyy")}
        </td>
      </tr>
      <AnimatePresence>
        {isExpanded && (
          <tr>
            <td colSpan={4} className="p-0">
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="px-6 py-4 bg-muted/20 border-t border-border">
                  <h4 className="text-sm font-medium text-foreground mb-3">Questionnaire Answers</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {Object.entries(parsedNotes).map(([key, value]) => (
                      <div key={key} className="space-y-1">
                        <p className="text-xs text-muted-foreground">
                          {questionLabels[key] || key}
                        </p>
                        <p className="text-sm text-foreground">{value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </td>
          </tr>
        )}
      </AnimatePresence>
    </>
  );
};

export const ProjectPlanLeadsTable = ({ leads, isLoading }: ProjectPlanLeadsTableProps) => {
  const projectPlanLeads = leads.filter((l) => l.source === "project_plan_modal");

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card border border-border rounded-xl overflow-hidden"
    >
      <div className="p-6 border-b border-border">
        <h2 className="text-lg font-semibold text-foreground">Project Plan Leads</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Leads from the project plan questionnaire. Click a row to expand.
        </p>
      </div>

      {isLoading ? (
        <div className="p-12 text-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto" />
        </div>
      ) : projectPlanLeads.length === 0 ? (
        <div className="p-12 text-center">
          <Users className="w-12 h-12 text-muted-foreground/50 mx-auto mb-4" />
          <p className="text-muted-foreground">No project plan leads yet</p>
          <p className="text-sm text-muted-foreground/70 mt-1">
            Leads will appear here when visitors complete the questionnaire
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left text-sm font-medium text-muted-foreground px-6 py-3">
                  Name
                </th>
                <th className="text-left text-sm font-medium text-muted-foreground px-6 py-3">
                  Email
                </th>
                <th className="text-left text-sm font-medium text-muted-foreground px-6 py-3 hidden sm:table-cell">
                  Website URL
                </th>
                <th className="text-left text-sm font-medium text-muted-foreground px-6 py-3">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {projectPlanLeads.map((lead) => (
                <ExpandableRow key={lead.id} lead={lead} />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </motion.div>
  );
};

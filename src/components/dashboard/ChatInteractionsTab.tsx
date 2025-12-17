import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { format, subDays } from "date-fns";
import { MessageCircle, Globe, Users, Loader2, ExternalLink, User, Mail, Filter } from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getScoreBadgeColor, getScoreEmoji, QualificationStatus } from "@/lib/leadScoring";

interface ChatInteraction {
  id: string;
  created_at: string;
  session_id: string;
  interaction_type: string;
  user_message: string | null;
  assistant_message: string | null;
  url_scraped: string | null;
  lead_id: string | null;
  metadata: any;
}

interface Lead {
  id: string;
  full_name: string;
  email: string;
  website: string | null;
  source: string | null;
  created_at: string;
  lead_score: number | null;
  qualification_status: string | null;
  intent_signals: any;
  engagement_depth: number | null;
}

interface ConversationModalProps {
  isOpen: boolean;
  onClose: () => void;
  sessionId: string;
  leadName: string;
  leadEmail: string;
  interactions: ChatInteraction[];
  leadScore?: number | null;
  qualificationStatus?: string | null;
  intentSignals?: any;
}

function ConversationModal({ 
  isOpen, 
  onClose, 
  sessionId, 
  leadName, 
  leadEmail, 
  interactions, 
  leadScore, 
  qualificationStatus,
  intentSignals 
}: ConversationModalProps) {
  // Filter interactions for this session
  const sessionInteractions = interactions
    .filter((i) => i.session_id === sessionId)
    .sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());

  // Find any URLs scraped in this session
  const urlsScraped = sessionInteractions.filter((i) => i.interaction_type === "url_scraped");

  const status = (qualificationStatus || 'cool') as QualificationStatus;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MessageCircle className="w-5 h-5 text-primary" />
            Conversation Details
          </DialogTitle>
        </DialogHeader>
        
        {/* Lead Info */}
        <div className="bg-muted/50 rounded-lg p-4 flex flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-muted-foreground" />
            <span className="font-medium text-foreground">{leadName || "Unknown"}</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-muted-foreground" />
            <a href={`mailto:${leadEmail}`} className="text-primary hover:underline">
              {leadEmail || "No email"}
            </a>
          </div>
          {leadScore !== undefined && leadScore !== null && (
            <div className="flex items-center gap-2">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getScoreBadgeColor(status)}`}>
                {getScoreEmoji(status)} Score: {leadScore} ({status})
              </span>
            </div>
          )}
        </div>

        {/* Intent Signals */}
        {intentSignals && Object.values(intentSignals).some(Boolean) && (
          <div className="bg-cyan-500/10 rounded-lg p-4">
            <div className="text-sm font-medium text-cyan-400 mb-2">Intent Signals Detected</div>
            <div className="flex flex-wrap gap-2">
              {intentSignals.pricing && (
                <span className="px-2 py-1 bg-cyan-500/20 text-cyan-400 rounded text-xs">💰 Pricing</span>
              )}
              {intentSignals.timeline && (
                <span className="px-2 py-1 bg-cyan-500/20 text-cyan-400 rounded text-xs">📅 Timeline</span>
              )}
              {intentSignals.urgency && (
                <span className="px-2 py-1 bg-cyan-500/20 text-cyan-400 rounded text-xs">⚡ Urgency</span>
              )}
              {intentSignals.specificService && (
                <span className="px-2 py-1 bg-cyan-500/20 text-cyan-400 rounded text-xs">🎯 Specific Service</span>
              )}
            </div>
          </div>
        )}

        {/* URLs Scraped */}
        {urlsScraped.length > 0 && (
          <div className="bg-purple-500/10 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Globe className="w-4 h-4 text-purple-400" />
              <span className="text-sm font-medium text-purple-400">URLs Analyzed</span>
            </div>
            <div className="space-y-1">
              {urlsScraped.map((url) => (
                <a
                  key={url.id}
                  href={url.url_scraped?.startsWith("http") ? url.url_scraped : `https://${url.url_scraped}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary hover:underline flex items-center gap-1"
                >
                  {url.url_scraped}
                  <ExternalLink className="w-3 h-3" />
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Conversation */}
        <div className="flex-1 overflow-y-auto space-y-3 min-h-0">
          <h4 className="text-sm font-medium text-muted-foreground">Conversation History</h4>
          {sessionInteractions
            .filter((i) => i.interaction_type === "message")
            .map((interaction) => (
              <div key={interaction.id} className="space-y-2">
                {interaction.user_message && (
                  <div className="flex justify-end">
                    <div className="bg-primary/20 text-foreground rounded-lg px-4 py-2 max-w-[80%]">
                      <p className="text-sm">{interaction.user_message}</p>
                      <span className="text-xs text-muted-foreground mt-1 block">
                        {format(new Date(interaction.created_at), "h:mm a")}
                      </span>
                    </div>
                  </div>
                )}
                {interaction.assistant_message && (
                  <div className="flex justify-start">
                    <div className="bg-muted text-foreground rounded-lg px-4 py-2 max-w-[80%]">
                      <p className="text-sm whitespace-pre-wrap">{interaction.assistant_message}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          {sessionInteractions.filter((i) => i.interaction_type === "message").length === 0 && (
            <p className="text-sm text-muted-foreground text-center py-4">
              No messages in this conversation
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function ChatInteractionsTab() {
  const [interactions, setInteractions] = useState<ChatInteraction[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeSubTab, setActiveSubTab] = useState<"all" | "urls" | "leads">("all");
  const [scoreFilter, setScoreFilter] = useState<"all" | "hot" | "warm" | "cool" | "cold">("all");
  const [selectedLead, setSelectedLead] = useState<{ 
    sessionId: string; 
    name: string; 
    email: string;
    leadScore?: number | null;
    qualificationStatus?: string | null;
    intentSignals?: any;
  } | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [interactionsResult, leadsResult] = await Promise.all([
        supabase
          .from("chat_interactions")
          .select("*")
          .order("created_at", { ascending: false }),
        supabase
          .from("leads")
          .select("*")
          .eq("source", "chatbot")
          .order("lead_score", { ascending: false })
      ]);

      if (interactionsResult.error) {
        console.error("Error fetching interactions:", interactionsResult.error);
      } else {
        setInteractions((interactionsResult.data as ChatInteraction[]) || []);
      }

      if (leadsResult.error) {
        console.error("Error fetching leads:", leadsResult.error);
      } else {
        setLeads((leadsResult.data as Lead[]) || []);
      }
    } catch (err) {
      console.error("Unexpected error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Stats
  const totalSessions = new Set(interactions.map((i) => i.session_id)).size;
  const totalMessages = interactions.filter((i) => i.interaction_type === "message").length;
  const urlsScraped = interactions.filter((i) => i.interaction_type === "url_scraped");
  const leadsCaptures = interactions.filter((i) => i.interaction_type === "lead_captured");

  // Lead score stats
  const hotLeads = leads.filter(l => l.qualification_status === 'hot').length;
  const warmLeads = leads.filter(l => l.qualification_status === 'warm').length;

  // Chart data - interactions per day
  const interactionsPerDay = Array.from({ length: 14 }, (_, i) => {
    const date = subDays(new Date(), 13 - i);
    const dayInteractions = interactions.filter((interaction) => {
      const interactionDate = new Date(interaction.created_at);
      return format(interactionDate, "yyyy-MM-dd") === format(date, "yyyy-MM-dd");
    }).length;
    return {
      date: format(date, "MMM d"),
      interactions: dayInteractions,
    };
  });

  // Filter leads by score
  const filteredLeads = scoreFilter === "all" 
    ? leads 
    : leads.filter(l => l.qualification_status === scoreFilter);

  // Filter based on sub-tab
  const filteredInteractions =
    activeSubTab === "all"
      ? interactions
      : activeSubTab === "urls"
      ? urlsScraped
      : leadsCaptures;

  const handleLeadClick = (interaction: ChatInteraction) => {
    const lead = leads.find(l => l.id === interaction.lead_id);
    setSelectedLead({
      sessionId: interaction.session_id,
      name: interaction.metadata?.name || lead?.full_name || "Unknown",
      email: interaction.metadata?.email || lead?.email || "No email",
      leadScore: lead?.lead_score || interaction.metadata?.leadScore,
      qualificationStatus: lead?.qualification_status || interaction.metadata?.qualificationStatus,
      intentSignals: lead?.intent_signals || interaction.metadata?.intentSignals,
    });
  };

  const handleLeadRowClick = (lead: Lead) => {
    // Find the session for this lead
    const leadInteraction = interactions.find(i => i.lead_id === lead.id);
    setSelectedLead({
      sessionId: leadInteraction?.session_id || "",
      name: lead.full_name,
      email: lead.email,
      leadScore: lead.lead_score,
      qualificationStatus: lead.qualification_status,
      intentSignals: lead.intent_signals,
    });
  };

  return (
    <div>
      {/* Conversation Modal */}
      {selectedLead && (
        <ConversationModal
          isOpen={!!selectedLead}
          onClose={() => setSelectedLead(null)}
          sessionId={selectedLead.sessionId}
          leadName={selectedLead.name}
          leadEmail={selectedLead.email}
          interactions={interactions}
          leadScore={selectedLead.leadScore}
          qualificationStatus={selectedLead.qualificationStatus}
          intentSignals={selectedLead.intentSignals}
        />
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card border border-border rounded-xl p-6"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center">
              <MessageCircle className="w-5 h-5 text-cyan-500" />
            </div>
            <span className="text-sm text-muted-foreground">Total Sessions</span>
          </div>
          <p className="text-3xl font-bold text-foreground">{totalSessions}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-card border border-border rounded-xl p-6"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center">
              <span className="text-lg">🔥</span>
            </div>
            <span className="text-sm text-muted-foreground">Hot Leads</span>
          </div>
          <p className="text-3xl font-bold text-foreground">{hotLeads}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-card border border-border rounded-xl p-6"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center">
              <span className="text-lg">🟡</span>
            </div>
            <span className="text-sm text-muted-foreground">Warm Leads</span>
          </div>
          <p className="text-3xl font-bold text-foreground">{warmLeads}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-card border border-border rounded-xl p-6"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
              <Globe className="w-5 h-5 text-purple-500" />
            </div>
            <span className="text-sm text-muted-foreground">URLs Scraped</span>
          </div>
          <p className="text-3xl font-bold text-foreground">{urlsScraped.length}</p>
        </motion.div>
      </div>

      {/* Chart */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="bg-card border border-border rounded-xl p-6 mb-8"
      >
        <h3 className="text-lg font-semibold text-foreground mb-4">Chat Activity Over Time</h3>
        <div className="h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={interactionsPerDay}>
              <defs>
                <linearGradient id="chatGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(190, 100%, 50%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(190, 100%, 50%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis
                dataKey="date"
                tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                axisLine={{ stroke: "hsl(var(--border))" }}
              />
              <YAxis
                tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                axisLine={{ stroke: "hsl(var(--border))" }}
                allowDecimals={false}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
                labelStyle={{ color: "hsl(var(--foreground))" }}
              />
              <Area
                type="monotone"
                dataKey="interactions"
                stroke="hsl(190, 100%, 50%)"
                strokeWidth={2}
                fill="url(#chatGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Sub-tabs and Table */}
      <div className="flex flex-wrap gap-2 mb-4 items-center justify-between">
        <div className="flex gap-2">
          <button
            onClick={() => setActiveSubTab("all")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeSubTab === "all"
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            All Activity ({interactions.length})
          </button>
          <button
            onClick={() => setActiveSubTab("urls")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeSubTab === "urls"
                ? "bg-purple-500 text-white"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            URLs Scraped ({urlsScraped.length})
          </button>
          <button
            onClick={() => setActiveSubTab("leads")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeSubTab === "leads"
                ? "bg-green-500 text-white"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            Leads ({leads.length})
          </button>
        </div>
        
        {activeSubTab === "leads" && (
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-muted-foreground" />
            <Select value={scoreFilter} onValueChange={(v) => setScoreFilter(v as any)}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Filter by score" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Leads</SelectItem>
                <SelectItem value="hot">🔥 Hot</SelectItem>
                <SelectItem value="warm">🟡 Warm</SelectItem>
                <SelectItem value="cool">🔵 Cool</SelectItem>
                <SelectItem value="cold">⚪ Cold</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-card border border-border rounded-xl overflow-hidden"
      >
        <div className="p-6 border-b border-border">
          <h2 className="text-lg font-semibold text-foreground">
            {activeSubTab === "all"
              ? "All Chat Activity"
              : activeSubTab === "urls"
              ? "URLs Analyzed"
              : "Leads from Chat"}
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            {activeSubTab === "all"
              ? "Complete log of all chat interactions"
              : activeSubTab === "urls"
              ? "Websites that visitors requested feedback on"
              : "Contact information captured through chat. Click a row to view conversation."}
          </p>
        </div>

        {isLoading ? (
          <div className="p-12 text-center">
            <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto" />
          </div>
        ) : activeSubTab === "leads" ? (
          // Leads table with scoring
          filteredLeads.length === 0 ? (
            <div className="p-12 text-center">
              <Users className="w-12 h-12 text-muted-foreground/50 mx-auto mb-4" />
              <p className="text-muted-foreground">No leads captured yet</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="text-left text-sm font-medium text-muted-foreground px-6 py-3">Score</th>
                    <th className="text-left text-sm font-medium text-muted-foreground px-6 py-3">Name</th>
                    <th className="text-left text-sm font-medium text-muted-foreground px-6 py-3">Email</th>
                    <th className="text-left text-sm font-medium text-muted-foreground px-6 py-3 hidden md:table-cell">Signals</th>
                    <th className="text-left text-sm font-medium text-muted-foreground px-6 py-3">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filteredLeads.map((lead) => {
                    const status = (lead.qualification_status || 'cool') as QualificationStatus;
                    return (
                      <tr
                        key={lead.id}
                        className="hover:bg-muted/30 transition-colors cursor-pointer"
                        onClick={() => handleLeadRowClick(lead)}
                      >
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getScoreBadgeColor(status)}`}>
                            {getScoreEmoji(status)} {lead.lead_score || 0}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="font-medium text-foreground">{lead.full_name}</span>
                        </td>
                        <td className="px-6 py-4">
                          <a href={`mailto:${lead.email}`} className="text-primary hover:underline" onClick={(e) => e.stopPropagation()}>
                            {lead.email}
                          </a>
                        </td>
                        <td className="px-6 py-4 hidden md:table-cell">
                          <div className="flex gap-1">
                            {lead.intent_signals?.pricing && <span className="text-xs" title="Pricing">💰</span>}
                            {lead.intent_signals?.timeline && <span className="text-xs" title="Timeline">📅</span>}
                            {lead.intent_signals?.urgency && <span className="text-xs" title="Urgency">⚡</span>}
                            {lead.intent_signals?.specificService && <span className="text-xs" title="Specific Service">🎯</span>}
                            {lead.engagement_depth && lead.engagement_depth >= 5 && <span className="text-xs" title={`${lead.engagement_depth} messages`}>💬</span>}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-muted-foreground">
                          {format(new Date(lead.created_at), "MMM d, h:mm a")}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )
        ) : filteredInteractions.length === 0 ? (
          <div className="p-12 text-center">
            <MessageCircle className="w-12 h-12 text-muted-foreground/50 mx-auto mb-4" />
            <p className="text-muted-foreground">No chat interactions yet</p>
            <p className="text-sm text-muted-foreground/70 mt-1">
              Interactions will appear here when visitors use the chat
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr>
                  <th className="text-left text-sm font-medium text-muted-foreground px-6 py-3">
                    Type
                  </th>
                  <th className="text-left text-sm font-medium text-muted-foreground px-6 py-3">
                    {activeSubTab === "urls" ? "URL" : "Content"}
                  </th>
                  <th className="text-left text-sm font-medium text-muted-foreground px-6 py-3 hidden md:table-cell">
                    Session
                  </th>
                  <th className="text-left text-sm font-medium text-muted-foreground px-6 py-3">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredInteractions.slice(0, 50).map((interaction) => (
                  <tr 
                    key={interaction.id} 
                    className={`hover:bg-muted/30 transition-colors ${
                      interaction.interaction_type === "lead_captured" ? "cursor-pointer" : ""
                    }`}
                    onClick={() => {
                      if (interaction.interaction_type === "lead_captured") {
                        handleLeadClick(interaction);
                      }
                    }}
                  >
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          interaction.interaction_type === "url_scraped"
                            ? "bg-purple-500/20 text-purple-400"
                            : interaction.interaction_type === "lead_captured"
                            ? "bg-green-500/20 text-green-400"
                            : "bg-blue-500/20 text-blue-400"
                        }`}
                      >
                        {interaction.interaction_type === "url_scraped"
                          ? "URL"
                          : interaction.interaction_type === "lead_captured"
                          ? "Lead"
                          : "Message"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {interaction.interaction_type === "url_scraped" ? (
                        <a
                          href={interaction.url_scraped?.startsWith("http") ? interaction.url_scraped : `https://${interaction.url_scraped}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline flex items-center gap-1"
                        >
                          {interaction.url_scraped}
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      ) : interaction.interaction_type === "lead_captured" ? (
                        <span className="text-foreground">
                          {interaction.metadata?.name || "Unknown"} - {interaction.metadata?.email || "No email"}
                        </span>
                      ) : (
                        <span className="text-foreground text-sm line-clamp-2">
                          {interaction.user_message || interaction.assistant_message || "-"}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 hidden md:table-cell">
                      <span className="text-xs text-muted-foreground font-mono">
                        {interaction.session_id.slice(0, 8)}...
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">
                      {format(new Date(interaction.created_at), "MMM d, h:mm a")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>
    </div>
  );
}

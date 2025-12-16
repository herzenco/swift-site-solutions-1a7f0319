import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { format, subDays } from "date-fns";
import { MessageCircle, Globe, Users, Loader2, ExternalLink } from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

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

export function ChatInteractionsTab() {
  const [interactions, setInteractions] = useState<ChatInteraction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeSubTab, setActiveSubTab] = useState<"all" | "urls" | "leads">("all");

  useEffect(() => {
    fetchInteractions();
  }, []);

  const fetchInteractions = async () => {
    try {
      const { data, error } = await supabase
        .from("chat_interactions")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching interactions:", error);
      } else {
        setInteractions((data as ChatInteraction[]) || []);
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

  // Filter based on sub-tab
  const filteredInteractions =
    activeSubTab === "all"
      ? interactions
      : activeSubTab === "urls"
      ? urlsScraped
      : leadsCaptures;

  return (
    <div>
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
            <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
              <MessageCircle className="w-5 h-5 text-blue-500" />
            </div>
            <span className="text-sm text-muted-foreground">Messages</span>
          </div>
          <p className="text-3xl font-bold text-foreground">{totalMessages}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
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

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-card border border-border rounded-xl p-6"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
              <Users className="w-5 h-5 text-green-500" />
            </div>
            <span className="text-sm text-muted-foreground">Leads Captured</span>
          </div>
          <p className="text-3xl font-bold text-foreground">{leadsCaptures.length}</p>
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
      <div className="flex gap-2 mb-4">
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
          Leads ({leadsCaptures.length})
        </button>
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
              : "Contact information captured through chat"}
          </p>
        </div>

        {isLoading ? (
          <div className="p-12 text-center">
            <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto" />
          </div>
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
                    {activeSubTab === "urls" ? "URL" : activeSubTab === "leads" ? "Details" : "Content"}
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
                  <tr key={interaction.id} className="hover:bg-muted/30 transition-colors">
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

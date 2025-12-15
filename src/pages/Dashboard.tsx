import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  LogOut,
  Users,
  Mail,
  Calendar,
  TrendingUp,
  ExternalLink,
  Loader2,
} from "lucide-react";
import { format } from "date-fns";
import { User, Session } from "@supabase/supabase-js";

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

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (!session?.user) {
          navigate("/auth");
        }
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (!session?.user) {
        navigate("/auth");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  useEffect(() => {
    if (session?.user) {
      fetchLeads();
    }
  }, [session]);

  const fetchLeads = async () => {
    try {
      const { data, error } = await supabase
        .from("leads")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching leads:", error);
        toast({
          title: "Error loading leads",
          description: error.message,
          variant: "destructive",
        });
      } else {
        setLeads(data || []);
      }
    } catch (err) {
      console.error("Unexpected error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/auth");
  };

  // Analytics
  const totalLeads = leads.length;
  const thisWeekLeads = leads.filter((lead) => {
    const leadDate = new Date(lead.created_at);
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return leadDate >= weekAgo;
  }).length;
  const heroModalLeads = leads.filter((l) => l.source === "hero_modal").length;

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <h1 className="text-xl font-bold text-foreground">Lead Dashboard</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground hidden sm:block">
              {user.email}
            </span>
            <Button variant="outline" size="sm" onClick={handleSignOut}>
              <LogOut className="w-4 h-4 mr-2" />
              Sign out
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card border border-border rounded-xl p-6"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Users className="w-5 h-5 text-primary" />
              </div>
              <span className="text-sm text-muted-foreground">Total Leads</span>
            </div>
            <p className="text-3xl font-bold text-foreground">{totalLeads}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-card border border-border rounded-xl p-6"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-green-500" />
              </div>
              <span className="text-sm text-muted-foreground">This Week</span>
            </div>
            <p className="text-3xl font-bold text-foreground">{thisWeekLeads}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-card border border-border rounded-xl p-6"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                <Mail className="w-5 h-5 text-blue-500" />
              </div>
              <span className="text-sm text-muted-foreground">Hero Modal</span>
            </div>
            <p className="text-3xl font-bold text-foreground">{heroModalLeads}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-card border border-border rounded-xl p-6"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center">
                <Calendar className="w-5 h-5 text-orange-500" />
              </div>
              <span className="text-sm text-muted-foreground">Conversion</span>
            </div>
            <p className="text-3xl font-bold text-foreground">
              {totalLeads > 0 ? `${Math.round((heroModalLeads / totalLeads) * 100)}%` : "0%"}
            </p>
          </motion.div>
        </div>

        {/* Leads Table */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-card border border-border rounded-xl overflow-hidden"
        >
          <div className="p-6 border-b border-border">
            <h2 className="text-lg font-semibold text-foreground">All Leads</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Recent form submissions from your website
            </p>
          </div>

          {isLoading ? (
            <div className="p-12 text-center">
              <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto" />
            </div>
          ) : leads.length === 0 ? (
            <div className="p-12 text-center">
              <Users className="w-12 h-12 text-muted-foreground/50 mx-auto mb-4" />
              <p className="text-muted-foreground">No leads yet</p>
              <p className="text-sm text-muted-foreground/70 mt-1">
                Leads will appear here when visitors submit the form
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
                    <th className="text-left text-sm font-medium text-muted-foreground px-6 py-3 hidden md:table-cell">
                      Phone
                    </th>
                    <th className="text-left text-sm font-medium text-muted-foreground px-6 py-3 hidden lg:table-cell">
                      Website
                    </th>
                    <th className="text-left text-sm font-medium text-muted-foreground px-6 py-3 hidden sm:table-cell">
                      Source
                    </th>
                    <th className="text-left text-sm font-medium text-muted-foreground px-6 py-3">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {leads.map((lead) => (
                    <tr
                      key={lead.id}
                      className="hover:bg-muted/30 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <span className="font-medium text-foreground">
                          {lead.full_name}
                        </span>
                        {lead.notes && (
                          <p className="text-xs text-muted-foreground mt-1 line-clamp-1 max-w-[200px]">
                            {lead.notes}
                          </p>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <a
                          href={`mailto:${lead.email}`}
                          className="text-primary hover:underline"
                        >
                          {lead.email}
                        </a>
                      </td>
                      <td className="px-6 py-4 text-muted-foreground hidden md:table-cell">
                        {lead.phone || "—"}
                      </td>
                      <td className="px-6 py-4 hidden lg:table-cell">
                        {lead.website ? (
                          <a
                            href={lead.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline inline-flex items-center gap-1"
                          >
                            Visit
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        ) : (
                          <span className="text-muted-foreground">—</span>
                        )}
                      </td>
                      <td className="px-6 py-4 hidden sm:table-cell">
                        <span className="text-xs bg-muted px-2 py-1 rounded-full text-muted-foreground">
                          {lead.source || "unknown"}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">
                        {format(new Date(lead.created_at), "MMM d, yyyy")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </motion.div>
      </main>
    </div>
  );
}

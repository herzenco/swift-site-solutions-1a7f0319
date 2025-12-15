import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProjectPlanLeadsTable } from "@/components/dashboard/ProjectPlanLeadsTable";
import { useToast } from "@/hooks/use-toast";
import {
  LogOut,
  Users,
  Mail,
  Calendar,
  TrendingUp,
  ExternalLink,
  Loader2,
  BarChart3,
  Eye,
  MousePointerClick,
  Globe,
} from "lucide-react";
import { format, subDays } from "date-fns";
import { User, Session } from "@supabase/supabase-js";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

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
  const [activeTab, setActiveTab] = useState("leads");
  const [leadsSubTab, setLeadsSubTab] = useState<string>("all");
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

  // Lead Analytics
  const totalLeads = leads.length;
  const thisWeekLeads = leads.filter((lead) => {
    const leadDate = new Date(lead.created_at);
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return leadDate >= weekAgo;
  }).length;
  const heroModalLeads = leads.filter((l) => l.source === "hero_modal").length;
  const projectPlanLeads = leads.filter((l) => l.source === "project_plan_modal").length;

  // Generate leads by day for chart
  const leadsPerDay = Array.from({ length: 14 }, (_, i) => {
    const date = subDays(new Date(), 13 - i);
    const dayLeads = leads.filter((lead) => {
      const leadDate = new Date(lead.created_at);
      return format(leadDate, "yyyy-MM-dd") === format(date, "yyyy-MM-dd");
    }).length;
    return {
      date: format(date, "MMM d"),
      leads: dayLeads,
    };
  });

  // Leads by source
  const leadsBySource = leads.reduce((acc, lead) => {
    const source = lead.source || "unknown";
    acc[source] = (acc[source] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const sourceChartData = Object.entries(leadsBySource).map(([source, count]) => ({
    source: source.replace("_", " "),
    count,
  }));

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
          <h1 className="text-xl font-bold text-foreground">Dashboard</h1>
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
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-8">
            <TabsTrigger value="leads" className="gap-2">
              <Users className="w-4 h-4" />
              Leads
            </TabsTrigger>
            <TabsTrigger value="analytics" className="gap-2">
              <BarChart3 className="w-4 h-4" />
              Analytics
            </TabsTrigger>
          </TabsList>

          {/* Leads Tab */}
          <TabsContent value="leads">
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
                  <span className="text-sm text-muted-foreground">Project Plan</span>
                </div>
                <p className="text-3xl font-bold text-foreground">{projectPlanLeads}</p>
              </motion.div>
            </div>

            {/* Leads Chart */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="bg-card border border-border rounded-xl p-6 mb-8"
            >
              <h3 className="text-lg font-semibold text-foreground mb-4">Leads Over Time</h3>
              <div className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={leadsPerDay}>
                    <defs>
                      <linearGradient id="leadGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
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
                      dataKey="leads"
                      stroke="hsl(var(--primary))"
                      strokeWidth={2}
                      fill="url(#leadGradient)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            {/* Leads Tables with Sub-tabs */}
            <Tabs value={leadsSubTab} onValueChange={setLeadsSubTab} className="w-full">
              <TabsList className="mb-4 bg-muted/50">
                <TabsTrigger value="all" className="gap-2 text-xs sm:text-sm">
                  All
                  <span className="bg-primary/20 text-primary px-1.5 py-0.5 rounded-full text-xs">{totalLeads}</span>
                </TabsTrigger>
                <TabsTrigger value="hero_modal" className="gap-2 text-xs sm:text-sm">
                  Hero Modal
                  <span className="bg-blue-500/20 text-blue-400 px-1.5 py-0.5 rounded-full text-xs">{heroModalLeads}</span>
                </TabsTrigger>
                <TabsTrigger value="project_plan_modal" className="gap-2 text-xs sm:text-sm">
                  Project Plan
                  <span className="bg-orange-500/20 text-orange-400 px-1.5 py-0.5 rounded-full text-xs">{projectPlanLeads}</span>
                </TabsTrigger>
              </TabsList>

              {["all", "hero_modal"].map((tabValue) => (
                <TabsContent key={tabValue} value={tabValue}>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-card border border-border rounded-xl overflow-hidden"
                  >
                    <div className="p-6 border-b border-border">
                      <h2 className="text-lg font-semibold text-foreground">
                        {tabValue === "all" ? "All Leads" : tabValue === "hero_modal" ? "Hero Modal Leads" : "Project Plan Leads"}
                      </h2>
                      <p className="text-sm text-muted-foreground mt-1">
                        {tabValue === "all" 
                          ? "All form submissions from your website" 
                          : tabValue === "hero_modal"
                          ? "Leads from the hero CTA modal"
                          : "Leads from the project plan questionnaire"}
                      </p>
                    </div>

                    {isLoading ? (
                      <div className="p-12 text-center">
                        <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto" />
                      </div>
                    ) : leads.filter((l) => tabValue === "all" || l.source === tabValue).length === 0 ? (
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
                              {tabValue === "all" && (
                                <th className="text-left text-sm font-medium text-muted-foreground px-6 py-3 hidden sm:table-cell">
                                  Source
                                </th>
                              )}
                              <th className="text-left text-sm font-medium text-muted-foreground px-6 py-3">
                                Date
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-border">
                            {leads
                              .filter((lead) => tabValue === "all" || lead.source === tabValue)
                              .map((lead) => (
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
                                <td className="px-6 py-4 hidden lg:table-cell text-sm text-muted-foreground max-w-[200px] truncate">
                                  {lead.website || "—"}
                                </td>
                                {tabValue === "all" && (
                                  <td className="px-6 py-4 hidden sm:table-cell">
                                    <span className={`text-xs px-2 py-1 rounded-full ${
                                      lead.source === "hero_modal" 
                                        ? "bg-blue-500/10 text-blue-400" 
                                        : lead.source === "project_plan_modal"
                                        ? "bg-orange-500/10 text-orange-400"
                                        : "bg-muted text-muted-foreground"
                                    }`}>
                                      {lead.source === "hero_modal" 
                                        ? "Hero Modal" 
                                        : lead.source === "project_plan_modal"
                                        ? "Project Plan"
                                        : lead.source || "unknown"}
                                    </span>
                                  </td>
                                )}
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
                </TabsContent>
              ))}

              {/* Project Plan Tab with dedicated expandable table */}
              <TabsContent value="project_plan_modal">
                <ProjectPlanLeadsTable leads={leads} isLoading={isLoading} />
              </TabsContent>
            </Tabs>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics">
            {/* Web Analytics Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-card border border-border rounded-xl p-6"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
                    <Eye className="w-5 h-5 text-purple-500" />
                  </div>
                  <span className="text-sm text-muted-foreground">Page Views</span>
                </div>
                <p className="text-3xl font-bold text-foreground">—</p>
                <p className="text-xs text-muted-foreground mt-1">Coming soon</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-card border border-border rounded-xl p-6"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center">
                    <Globe className="w-5 h-5 text-cyan-500" />
                  </div>
                  <span className="text-sm text-muted-foreground">Unique Visitors</span>
                </div>
                <p className="text-3xl font-bold text-foreground">—</p>
                <p className="text-xs text-muted-foreground mt-1">Coming soon</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-card border border-border rounded-xl p-6"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-lg bg-pink-500/10 flex items-center justify-center">
                    <MousePointerClick className="w-5 h-5 text-pink-500" />
                  </div>
                  <span className="text-sm text-muted-foreground">CTA Clicks</span>
                </div>
                <p className="text-3xl font-bold text-foreground">—</p>
                <p className="text-xs text-muted-foreground mt-1">Coming soon</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-card border border-border rounded-xl p-6"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-amber-500" />
                  </div>
                  <span className="text-sm text-muted-foreground">Bounce Rate</span>
                </div>
                <p className="text-3xl font-bold text-foreground">—</p>
                <p className="text-xs text-muted-foreground mt-1">Coming soon</p>
              </motion.div>
            </div>

            {/* Leads by Source Chart */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="bg-card border border-border rounded-xl p-6"
              >
                <h3 className="text-lg font-semibold text-foreground mb-4">Leads by Source</h3>
                {sourceChartData.length > 0 ? (
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={sourceChartData} layout="vertical">
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                        <XAxis
                          type="number"
                          tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                          axisLine={{ stroke: "hsl(var(--border))" }}
                          allowDecimals={false}
                        />
                        <YAxis
                          type="category"
                          dataKey="source"
                          tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                          axisLine={{ stroke: "hsl(var(--border))" }}
                          width={100}
                        />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "hsl(var(--card))",
                            border: "1px solid hsl(var(--border))",
                            borderRadius: "8px",
                          }}
                          labelStyle={{ color: "hsl(var(--foreground))" }}
                        />
                        <Bar dataKey="count" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                ) : (
                  <div className="h-[300px] flex items-center justify-center">
                    <p className="text-muted-foreground">No data yet</p>
                  </div>
                )}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-card border border-border rounded-xl p-6"
              >
                <h3 className="text-lg font-semibold text-foreground mb-4">Lead Trends (14 days)</h3>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={leadsPerDay}>
                      <defs>
                        <linearGradient id="leadGradient2" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
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
                        dataKey="leads"
                        stroke="hsl(var(--primary))"
                        strokeWidth={2}
                        fill="url(#leadGradient2)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </motion.div>
            </div>

            {/* Web Analytics Notice */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
              className="mt-8 bg-muted/50 border border-border rounded-xl p-6 text-center"
            >
              <BarChart3 className="w-12 h-12 text-muted-foreground/50 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Full Web Analytics Coming Soon
              </h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                Track page views, visitor sessions, referral sources, and more. 
                Connect Google Analytics or use our built-in tracking.
              </p>
            </motion.div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

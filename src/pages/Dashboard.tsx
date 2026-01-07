import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProjectPlanLeadsTable } from "@/components/dashboard/ProjectPlanLeadsTable";
import { ChatInteractionsTab } from "@/components/dashboard/ChatInteractionsTab";
import { useToast } from "@/hooks/use-toast";
import { getScoreBadgeColor, getScoreEmoji, QualificationStatus } from "@/lib/leadScoring";
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
  MessageCircle,
  Clock,
  Monitor,
  Smartphone,
  Tablet,
  Sparkles,
  Download,
  FileText,
  BookOpen,
  Layers,
} from "lucide-react";
import { format, subDays } from "date-fns";
import { User, Session } from "@supabase/supabase-js";

interface PageSession {
  id: string;
  session_id: string;
  page_path: string;
  referrer: string | null;
  started_at: string;
  ended_at: string | null;
  duration_seconds: number | null;
  device_type: string | null;
}
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
  lead_score: number | null;
  qualification_status: string | null;
  intent_signals: any;
  engagement_depth: number | null;
  industry: string | null;
}

// Export leads to CSV
const exportLeadsToCSV = (leads: Lead[], filename: string = 'leads.csv') => {
  const headers = ['Name', 'Email', 'Phone', 'Website', 'Industry', 'Source', 'Score', 'Status', 'Notes', 'Date'];
  
  const csvContent = [
    headers.join(','),
    ...leads.map(lead => [
      `"${(lead.full_name || '').replace(/"/g, '""')}"`,
      `"${(lead.email || '').replace(/"/g, '""')}"`,
      `"${(lead.phone || '').replace(/"/g, '""')}"`,
      `"${(lead.website || '').replace(/"/g, '""')}"`,
      `"${(lead.industry || '').replace(/"/g, '""')}"`,
      `"${(lead.source || '').replace(/"/g, '""')}"`,
      lead.lead_score ?? '',
      `"${(lead.qualification_status || '').replace(/"/g, '""')}"`,
      `"${(lead.notes || '').replace(/"/g, '""')}"`,
      `"${lead.created_at ? format(new Date(lead.created_at), 'yyyy-MM-dd HH:mm:ss') : ''}"`,
    ].join(','))
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
  URL.revokeObjectURL(link.href);
};

// Check if a URL/domain is potentially invalid (common invalid patterns)
const isInvalidUrl = (url: string | null): boolean => {
  if (!url) return false;
  
  const urlLower = url.toLowerCase().trim();
  
  // Check for obviously invalid domains
  const invalidPatterns = [
    /^https?:\/\/test\.com\/?$/i,
    /^https?:\/\/example\.(com|org|net)\/?$/i,
    /^https?:\/\/localhost/i,
    /^https?:\/\/127\./,
    /^https?:\/\/(www\.)?fake/i,
    /^https?:\/\/(www\.)?placeholder/i,
    /^test\.com$/i,
    /^example\.(com|org|net)$/i,
    /^localhost/i,
    /^fake/i,
    /^placeholder/i,
    /^n\/a$/i,
    /^none$/i,
    /^null$/i,
    /^undefined$/i,
  ];
  
  return invalidPatterns.some(pattern => pattern.test(urlLower));
};

interface VercelAnalytics {
  pageViews: number;
  uniqueVisitors: number;
  bounceRate: number;
  ctaClicks: number;
}

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [pageSessions, setPageSessions] = useState<PageSession[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("leads");
  const [leadsSubTab, setLeadsSubTab] = useState<string>("all");
  const [analytics, setAnalytics] = useState<VercelAnalytics | null>(null);
  const [analyticsLoading, setAnalyticsLoading] = useState(false);
  const [sessionsLoading, setSessionsLoading] = useState(false);
  const [enrichingLeads, setEnrichingLeads] = useState(false);
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
      fetchAnalytics();
      fetchPageSessions();
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

  const fetchAnalytics = async () => {
    setAnalyticsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("vercel-analytics");
      
      if (error) {
        console.error("Error fetching analytics:", error);
      } else if (data) {
        setAnalytics({
          pageViews: data.pageViews || 0,
          uniqueVisitors: data.uniqueVisitors || 0,
          bounceRate: data.bounceRate || 0,
          ctaClicks: data.ctaClicks || 0,
        });
      }
    } catch (err) {
      console.error("Analytics fetch error:", err);
    } finally {
      setAnalyticsLoading(false);
    }
  };

  const fetchPageSessions = async () => {
    setSessionsLoading(true);
    try {
      const thirtyDaysAgo = subDays(new Date(), 30).toISOString();
      const { data, error } = await supabase
        .from("page_sessions")
        .select("*")
        .gte("started_at", thirtyDaysAgo)
        .order("started_at", { ascending: false });

      if (error) {
        console.error("Error fetching page sessions:", error);
      } else {
        setPageSessions(data || []);
      }
    } catch (err) {
      console.error("Page sessions fetch error:", err);
    } finally {
      setSessionsLoading(false);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/auth");
  };

  const handleEnrichLeads = async () => {
    const leadsToEnrich = leads.filter(
      (lead) => lead.website && (!lead.industry || !lead.phone)
    );

    if (leadsToEnrich.length === 0) {
      toast({
        title: "No leads to enrich",
        description: "All leads with websites already have enriched data.",
      });
      return;
    }

    setEnrichingLeads(true);
    toast({
      title: "Enriching leads...",
      description: `Processing ${leadsToEnrich.length} lead(s) with websites.`,
    });

    let successCount = 0;
    let errorCount = 0;

    for (const lead of leadsToEnrich) {
      try {
        const { error } = await supabase.functions.invoke("enrich-lead", {
          body: { leadId: lead.id, url: lead.website },
        });

        if (error) {
          console.error("Error enriching lead:", lead.id, error);
          errorCount++;
        } else {
          successCount++;
        }
      } catch (err) {
        console.error("Error enriching lead:", lead.id, err);
        errorCount++;
      }
    }

    setEnrichingLeads(false);
    
    // Refresh leads data
    await fetchLeads();

    toast({
      title: "Enrichment complete",
      description: `Successfully enriched ${successCount} lead(s).${errorCount > 0 ? ` ${errorCount} failed.` : ""}`,
    });
  };

  // Session Analytics
  const totalSessions = pageSessions.length;
  const uniqueSessions = new Set(pageSessions.map(s => s.session_id)).size;
  const avgSessionDuration = pageSessions.filter(s => s.duration_seconds).length > 0
    ? Math.round(pageSessions.filter(s => s.duration_seconds).reduce((sum, s) => sum + (s.duration_seconds || 0), 0) / pageSessions.filter(s => s.duration_seconds).length)
    : 0;
  
  // Device breakdown
  const deviceCounts = pageSessions.reduce((acc, s) => {
    const device = s.device_type || "unknown";
    acc[device] = (acc[device] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Page category breakdown
  const getPageCategory = (path: string): string => {
    if (path === "/") return "Homepage";
    if (path.startsWith("/resources/blog")) return "Blog";
    if (path.startsWith("/resources/how-to")) return "How-To Guides";
    if (path.startsWith("/resources")) return "Resources";
    if (path.startsWith("/use-cases")) return "Use Cases";
    return "Other";
  };

  const categoryCounts = pageSessions.reduce((acc, s) => {
    const category = getPageCategory(s.page_path);
    acc[category] = (acc[category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Blog-specific metrics
  const blogSessions = pageSessions.filter(s => s.page_path.startsWith("/resources/blog"));
  const blogPageViews = blogSessions.length;
  const avgBlogReadTime = blogSessions.filter(s => s.duration_seconds).length > 0
    ? Math.round(blogSessions.filter(s => s.duration_seconds).reduce((sum, s) => sum + (s.duration_seconds || 0), 0) / blogSessions.filter(s => s.duration_seconds).length)
    : 0;

  // Top blog posts
  const blogPageCounts = blogSessions.reduce((acc, s) => {
    acc[s.page_path] = (acc[s.page_path] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  const topBlogPosts = Object.entries(blogPageCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  // Top pages
  const pageCounts = pageSessions.reduce((acc, s) => {
    acc[s.page_path] = (acc[s.page_path] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  const topPages = Object.entries(pageCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  // Sessions per day for chart
  const sessionsPerDay = Array.from({ length: 14 }, (_, i) => {
    const date = subDays(new Date(), 13 - i);
    const daySessions = pageSessions.filter((s) => {
      const sessionDate = new Date(s.started_at);
      return format(sessionDate, "yyyy-MM-dd") === format(date, "yyyy-MM-dd");
    }).length;
    return {
      date: format(date, "MMM d"),
      sessions: daySessions,
    };
  });

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
  const chatbotLeads = leads.filter((l) => l.source === "chatbot").length;
  const realEstateLeads = leads.filter((l) => l.source === "real_estate_page").length;
  const professionalServicesLeads = leads.filter((l) => l.source === "professional_services_page").length;
  const homeServicesLeads = leads.filter((l) => l.source === "home_services_page").length;
  const educationCoachingLeads = leads.filter((l) => l.source === "education_coaching_page").length;

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
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleEnrichLeads}
              disabled={enrichingLeads}
            >
              {enrichingLeads ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Sparkles className="w-4 h-4 mr-2" />
              )}
              {enrichingLeads ? "Enriching..." : "Enrich Leads"}
            </Button>
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
            <TabsTrigger value="chat" className="gap-2">
              <MessageCircle className="w-4 h-4" />
              Chat
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
              <TabsList className="mb-4 bg-muted/50 flex-wrap h-auto gap-1">
                <TabsTrigger value="all" className="gap-2 text-xs sm:text-sm">
                  All
                  <span className="bg-primary/20 text-primary px-1.5 py-0.5 rounded-full text-xs">{totalLeads}</span>
                </TabsTrigger>
                <TabsTrigger value="hero_modal" className="gap-2 text-xs sm:text-sm">
                  Hero
                  <span className="bg-blue-500/20 text-blue-400 px-1.5 py-0.5 rounded-full text-xs">{heroModalLeads}</span>
                </TabsTrigger>
                <TabsTrigger value="project_plan_modal" className="gap-2 text-xs sm:text-sm">
                  Project Plan
                  <span className="bg-orange-500/20 text-orange-400 px-1.5 py-0.5 rounded-full text-xs">{projectPlanLeads}</span>
                </TabsTrigger>
                <TabsTrigger value="chatbot" className="gap-2 text-xs sm:text-sm">
                  Chatbot
                  <span className="bg-cyan-500/20 text-cyan-400 px-1.5 py-0.5 rounded-full text-xs">{chatbotLeads}</span>
                </TabsTrigger>
                <TabsTrigger value="real_estate_page" className="gap-2 text-xs sm:text-sm">
                  Real Estate
                  <span className="bg-green-500/20 text-green-400 px-1.5 py-0.5 rounded-full text-xs">{realEstateLeads}</span>
                </TabsTrigger>
                <TabsTrigger value="professional_services_page" className="gap-2 text-xs sm:text-sm">
                  Law Firms
                  <span className="bg-purple-500/20 text-purple-400 px-1.5 py-0.5 rounded-full text-xs">{professionalServicesLeads}</span>
                </TabsTrigger>
                <TabsTrigger value="home_services_page" className="gap-2 text-xs sm:text-sm">
                  Home Services
                  <span className="bg-yellow-500/20 text-yellow-400 px-1.5 py-0.5 rounded-full text-xs">{homeServicesLeads}</span>
                </TabsTrigger>
                <TabsTrigger value="education_coaching_page" className="gap-2 text-xs sm:text-sm">
                  Education
                  <span className="bg-pink-500/20 text-pink-400 px-1.5 py-0.5 rounded-full text-xs">{educationCoachingLeads}</span>
                </TabsTrigger>
              </TabsList>

              {["all", "hero_modal", "project_plan_modal", "chatbot", "real_estate_page", "professional_services_page", "home_services_page", "education_coaching_page"].map((tabValue) => (
                <TabsContent key={tabValue} value={tabValue}>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-card border border-border rounded-xl overflow-hidden"
                  >
                    <div className="p-6 border-b border-border flex items-start justify-between">
                      <div>
                        <h2 className="text-lg font-semibold text-foreground">
                          {tabValue === "all" ? "All Leads" 
                            : tabValue === "hero_modal" ? "Hero Modal Leads" 
                            : tabValue === "project_plan_modal" ? "Project Plan Leads"
                            : tabValue === "chatbot" ? "Chatbot Leads"
                            : tabValue === "real_estate_page" ? "Real Estate Leads"
                            : tabValue === "professional_services_page" ? "Professional Services Leads"
                            : tabValue === "home_services_page" ? "Home Services Leads"
                            : "Education & Coaching Leads"}
                        </h2>
                        <p className="text-sm text-muted-foreground mt-1">
                          {tabValue === "all" 
                            ? "All form submissions from your website" 
                            : tabValue === "hero_modal"
                            ? "Leads from the hero CTA modal"
                            : tabValue === "project_plan_modal"
                            ? "Leads from the project plan questionnaire"
                            : tabValue === "chatbot"
                            ? "Leads captured through AI chatbot conversations"
                            : `Leads from the ${tabValue.replace(/_/g, " ").replace(" page", "")} use-case page`}
                        </p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          const filteredLeads = leads.filter((l) => tabValue === "all" || l.source === tabValue);
                          const tabName = tabValue === "all" ? "all-leads" : tabValue.replace(/_/g, "-");
                          exportLeadsToCSV(filteredLeads, `${tabName}-${format(new Date(), 'yyyy-MM-dd')}.csv`);
                          toast({
                            title: "Export complete",
                            description: `Exported ${filteredLeads.length} leads to CSV`,
                          });
                        }}
                        disabled={leads.filter((l) => tabValue === "all" || l.source === tabValue).length === 0}
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Export CSV
                      </Button>
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
                                Score
                              </th>
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
                              <th className="text-left text-sm font-medium text-muted-foreground px-6 py-3 hidden xl:table-cell">
                                Industry
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
                                  {lead.lead_score !== null && lead.lead_score !== undefined ? (
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getScoreBadgeColor((lead.qualification_status || 'cool') as QualificationStatus)}`}>
                                      {getScoreEmoji((lead.qualification_status || 'cool') as QualificationStatus)} {lead.lead_score}
                                    </span>
                                  ) : (
                                    <span className="text-muted-foreground text-xs">—</span>
                                  )}
                                </td>
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
                                <td className="px-6 py-4 text-muted-foreground hidden md:table-cell whitespace-nowrap">
                                  {lead.phone || "—"}
                                </td>
                                <td className="px-6 py-4 hidden lg:table-cell text-sm max-w-[200px] truncate">
                                  {lead.website ? (
                                    <span className={isInvalidUrl(lead.website) ? "text-red-400" : "text-muted-foreground"}>
                                      {lead.website}
                                      {isInvalidUrl(lead.website) && (
                                        <span className="ml-1 text-xs text-red-500" title="This URL may be invalid or a placeholder">⚠</span>
                                      )}
                                    </span>
                                  ) : "—"}
                                </td>
                                <td className="px-6 py-4 hidden xl:table-cell">
                                  {lead.industry ? (
                                    <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
                                      {lead.industry}
                                    </span>
                                  ) : (
                                    <span className="text-muted-foreground text-xs">—</span>
                                  )}
                                </td>
                                {tabValue === "all" && (
                                  <td className="px-6 py-4 hidden sm:table-cell">
                                    <span className={`text-xs px-2 py-1 rounded-full ${
                                      lead.source === "hero_modal" 
                                        ? "bg-blue-500/10 text-blue-400" 
                                        : lead.source === "project_plan_modal"
                                        ? "bg-orange-500/10 text-orange-400"
                                        : lead.source === "real_estate_page"
                                        ? "bg-green-500/10 text-green-400"
                                        : lead.source === "professional_services_page"
                                        ? "bg-purple-500/10 text-purple-400"
                                        : lead.source === "home_services_page"
                                        ? "bg-yellow-500/10 text-yellow-400"
                                        : lead.source === "education_coaching_page"
                                        ? "bg-pink-500/10 text-pink-400"
                                        : "bg-muted text-muted-foreground"
                                    }`}>
                                      {lead.source === "hero_modal" 
                                        ? "Hero" 
                                        : lead.source === "project_plan_modal"
                                        ? "Project Plan"
                                        : lead.source === "real_estate_page"
                                        ? "Real Estate"
                                        : lead.source === "professional_services_page"
                                        ? "Law Firms"
                                        : lead.source === "home_services_page"
                                        ? "Home Services"
                                        : lead.source === "education_coaching_page"
                                        ? "Education"
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

          {/* Chat Tab */}
          <TabsContent value="chat">
            <ChatInteractionsTab />
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics">
            {/* Top Row: Core Metrics */}
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
                  <span className="text-sm text-muted-foreground">Total Sessions</span>
                </div>
                {sessionsLoading ? (
                  <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
                ) : (
                  <>
                    <p className="text-3xl font-bold text-foreground">{totalSessions.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground mt-1">Last 30 days</p>
                  </>
                )}
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
                {sessionsLoading ? (
                  <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
                ) : (
                  <>
                    <p className="text-3xl font-bold text-foreground">{uniqueSessions.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground mt-1">Last 30 days</p>
                  </>
                )}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-card border border-border rounded-xl p-6"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                    <Clock className="w-5 h-5 text-green-500" />
                  </div>
                  <span className="text-sm text-muted-foreground">Avg. Session</span>
                </div>
                {sessionsLoading ? (
                  <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
                ) : (
                  <>
                    <p className="text-3xl font-bold text-foreground">
                      {avgSessionDuration > 60 
                        ? `${Math.floor(avgSessionDuration / 60)}m ${avgSessionDuration % 60}s`
                        : `${avgSessionDuration}s`}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">Time on site</p>
                  </>
                )}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-card border border-border rounded-xl p-6"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-lg bg-pink-500/10 flex items-center justify-center">
                    <MousePointerClick className="w-5 h-5 text-pink-500" />
                  </div>
                  <span className="text-sm text-muted-foreground">Lead Conversions</span>
                </div>
                <>
                  <p className="text-3xl font-bold text-foreground">{totalLeads}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {totalSessions > 0 ? `${((totalLeads / totalSessions) * 100).toFixed(1)}% rate` : "All time"}
                  </p>
                </>
              </motion.div>
            </div>

            {/* Second Row: Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="bg-card border border-border rounded-xl p-6"
              >
                <h3 className="text-lg font-semibold text-foreground mb-4">Traffic (14 days)</h3>
                <div className="h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={sessionsPerDay}>
                      <defs>
                        <linearGradient id="sessionGradient" x1="0" y1="0" x2="0" y2="1">
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
                        dataKey="sessions"
                        stroke="hsl(var(--primary))"
                        strokeWidth={2}
                        fill="url(#sessionGradient)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-card border border-border rounded-xl p-6"
              >
                <h3 className="text-lg font-semibold text-foreground mb-4">Device Breakdown</h3>
                <div className="space-y-4">
                  {Object.entries(deviceCounts).length > 0 ? (
                    Object.entries(deviceCounts)
                      .sort((a, b) => b[1] - a[1])
                      .map(([device, count]) => {
                        const percentage = totalSessions > 0 ? ((count / totalSessions) * 100).toFixed(1) : 0;
                        const Icon = device === "mobile" ? Smartphone : device === "tablet" ? Tablet : Monitor;
                        return (
                          <div key={device} className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                              <Icon className="w-5 h-5 text-muted-foreground" />
                            </div>
                            <div className="flex-1">
                              <div className="flex justify-between mb-1">
                                <span className="text-sm font-medium text-foreground capitalize">{device}</span>
                                <span className="text-sm text-muted-foreground">{percentage}%</span>
                              </div>
                              <div className="h-2 bg-muted rounded-full overflow-hidden">
                                <div 
                                  className="h-full bg-primary rounded-full transition-all"
                                  style={{ width: `${percentage}%` }}
                                />
                              </div>
                            </div>
                            <span className="text-sm font-medium text-foreground w-12 text-right">{count}</span>
                          </div>
                        );
                      })
                  ) : (
                    <div className="h-[200px] flex items-center justify-center">
                      <p className="text-muted-foreground">No data yet</p>
                    </div>
                  )}
                </div>
              </motion.div>
            </div>

            {/* Third Row: Top Pages & Lead Sources */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 }}
                className="bg-card border border-border rounded-xl p-6"
              >
                <h3 className="text-lg font-semibold text-foreground mb-4">Top Pages</h3>
                {topPages.length > 0 ? (
                  <div className="space-y-3">
                    {topPages.map(([path, count], index) => {
                      const percentage = totalSessions > 0 ? ((count / totalSessions) * 100).toFixed(1) : 0;
                      return (
                        <div key={path} className="flex items-center gap-3">
                          <span className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-medium text-primary">
                            {index + 1}
                          </span>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-foreground truncate">{path}</p>
                            <div className="h-1.5 bg-muted rounded-full mt-1 overflow-hidden">
                              <div 
                                className="h-full bg-primary/60 rounded-full"
                                style={{ width: `${percentage}%` }}
                              />
                            </div>
                          </div>
                          <span className="text-sm text-muted-foreground">{count} views</span>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="h-[200px] flex items-center justify-center">
                    <p className="text-muted-foreground">No data yet</p>
                  </div>
                )}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-card border border-border rounded-xl p-6"
              >
                <h3 className="text-lg font-semibold text-foreground mb-4">Leads by Source</h3>
                {sourceChartData.length > 0 ? (
                  <div className="h-[250px]">
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
                  <div className="h-[250px] flex items-center justify-center">
                    <p className="text-muted-foreground">No data yet</p>
                  </div>
                )}
              </motion.div>
            </div>

            {/* Fourth Row: Content Analytics */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
              {/* Page Categories */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55 }}
                className="bg-card border border-border rounded-xl p-6"
              >
                <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Layers className="w-5 h-5 text-primary" />
                  Traffic by Section
                </h3>
                {Object.keys(categoryCounts).length > 0 ? (
                  <div className="space-y-3">
                    {Object.entries(categoryCounts)
                      .sort((a, b) => b[1] - a[1])
                      .map(([category, count]) => {
                        const percentage = totalSessions > 0 ? ((count / totalSessions) * 100).toFixed(1) : 0;
                        return (
                          <div key={category} className="flex items-center gap-3">
                            <div className="flex-1 min-w-0">
                              <div className="flex justify-between mb-1">
                                <span className="text-sm font-medium text-foreground">{category}</span>
                                <span className="text-sm text-muted-foreground">{percentage}%</span>
                              </div>
                              <div className="h-2 bg-muted rounded-full overflow-hidden">
                                <div 
                                  className="h-full bg-primary rounded-full transition-all"
                                  style={{ width: `${percentage}%` }}
                                />
                              </div>
                            </div>
                            <span className="text-sm font-medium text-foreground w-12 text-right">{count}</span>
                          </div>
                        );
                      })}
                  </div>
                ) : (
                  <div className="h-[200px] flex items-center justify-center">
                    <p className="text-muted-foreground">No data yet</p>
                  </div>
                )}
              </motion.div>

              {/* Blog Performance */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="bg-card border border-border rounded-xl p-6"
              >
                <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-primary" />
                  Blog Performance
                </h3>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-muted/30 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-1">
                      <FileText className="w-4 h-4 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">Page Views</span>
                    </div>
                    <p className="text-2xl font-bold text-foreground">{blogPageViews}</p>
                  </div>
                  <div className="bg-muted/30 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-1">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">Avg. Read Time</span>
                    </div>
                    <p className="text-2xl font-bold text-foreground">
                      {avgBlogReadTime > 60 
                        ? `${Math.floor(avgBlogReadTime / 60)}m ${avgBlogReadTime % 60}s`
                        : `${avgBlogReadTime}s`}
                    </p>
                  </div>
                </div>
                {topBlogPosts.length > 0 ? (
                  <div className="space-y-2">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Top Posts</p>
                    {topBlogPosts.slice(0, 3).map(([path, count], index) => (
                      <div key={path} className="flex items-center gap-2 text-sm">
                        <span className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center text-xs font-medium text-primary">
                          {index + 1}
                        </span>
                        <span className="flex-1 truncate text-foreground">
                          {path.split('/').pop()?.replace(/-/g, ' ') || path}
                        </span>
                        <span className="text-muted-foreground">{count}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground text-center py-4">No blog visits yet</p>
                )}
              </motion.div>
            </div>

            {/* Recent Page Visits Table */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65 }}
              className="mt-8 bg-card border border-border rounded-xl overflow-hidden"
            >
              <div className="p-6 border-b border-border">
                <h3 className="text-lg font-semibold text-foreground">Recent Page Visits</h3>
                <p className="text-sm text-muted-foreground mt-1">Individual visitor sessions and pages viewed</p>
              </div>
              
              {sessionsLoading ? (
                <div className="p-12 text-center">
                  <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto" />
                </div>
              ) : pageSessions.length === 0 ? (
                <div className="p-12 text-center">
                  <Eye className="w-12 h-12 text-muted-foreground/50 mx-auto mb-4" />
                  <p className="text-muted-foreground">No page visits yet</p>
                  <p className="text-sm text-muted-foreground/70 mt-1">
                    Visits will appear here as users browse your site
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border bg-muted/30">
                        <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          Session
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          Page
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          Device
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          Duration
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          Time
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {pageSessions.slice(0, 50).map((pageSession) => (
                        <tr key={pageSession.id} className="hover:bg-muted/20 transition-colors">
                          <td className="px-6 py-4">
                            <span className="text-xs font-mono text-muted-foreground bg-muted px-2 py-1 rounded">
                              {pageSession.session_id.slice(0, 12)}...
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span className="text-sm text-foreground">{pageSession.page_path}</span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              {pageSession.device_type === "mobile" ? (
                                <Smartphone className="w-4 h-4 text-muted-foreground" />
                              ) : pageSession.device_type === "tablet" ? (
                                <Tablet className="w-4 h-4 text-muted-foreground" />
                              ) : (
                                <Monitor className="w-4 h-4 text-muted-foreground" />
                              )}
                              <span className="text-sm text-muted-foreground capitalize">
                                {pageSession.device_type || "desktop"}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            {pageSession.duration_seconds ? (
                              <span className="text-sm text-foreground">
                                {pageSession.duration_seconds > 60
                                  ? `${Math.floor(pageSession.duration_seconds / 60)}m ${pageSession.duration_seconds % 60}s`
                                  : `${pageSession.duration_seconds}s`}
                              </span>
                            ) : (
                              <span className="text-sm text-muted-foreground">Active</span>
                            )}
                          </td>
                          <td className="px-6 py-4 text-sm text-muted-foreground">
                            {format(new Date(pageSession.started_at), "MMM d, h:mm a")}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </motion.div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

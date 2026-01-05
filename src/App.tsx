import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ScrollToTop } from "@/components/ScrollToTop";
import { HelmetProvider } from "react-helmet-async";
import { ChatWidget } from "@/components/ChatWidget";
import { PageTracker } from "@/components/PageTracker";
import { Analytics } from "@vercel/analytics/react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import ProfessionalServices from "./pages/use-cases/ProfessionalServices";
import HomeServices from "./pages/use-cases/HomeServices";
import Resources from "./pages/resources/Resources";
import HowTo from "./pages/resources/HowTo";
import Blog from "./pages/resources/Blog";
import FAQ from "./pages/resources/FAQ";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <PageTracker />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/use-cases/professional-services" element={<ProfessionalServices />} />
            <Route path="/use-cases/home-services" element={<HomeServices />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/resources/how-to" element={<HowTo />} />
            <Route path="/resources/blog" element={<Blog />} />
            <Route path="/resources/faq" element={<FAQ />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <ChatWidget />
          <Analytics />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;

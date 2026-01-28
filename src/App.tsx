import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ScrollToTop } from "@/components/ScrollToTop";
import { HelmetProvider } from "react-helmet-async";
import { ChatWidget } from "@/components/ChatWidget";
import { MobileWhatsAppButton } from "@/components/MobileWhatsAppButton";
import { PageTracker } from "@/components/PageTracker";
import { Analytics } from "@vercel/analytics/react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ProfessionalServices from "./pages/use-cases/ProfessionalServices";
import HomeServices from "./pages/use-cases/HomeServices";
import Resources from "./pages/resources/Resources";
import HowTo from "./pages/resources/HowTo";
import HowToGuide from "./pages/resources/HowToGuide";
import Blog from "./pages/resources/Blog";
import BlogCategory from "./pages/resources/BlogCategory";
import BlogPost from "./pages/resources/BlogPost";
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
            <Route path="/use-cases/professional-services" element={<ProfessionalServices />} />
            <Route path="/use-cases/home-services" element={<HomeServices />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/resources/how-to" element={<HowTo />} />
            <Route path="/resources/how-to/:slug" element={<HowToGuide />} />
            <Route path="/resources/blog" element={<Blog />} />
            <Route path="/resources/blog/:category" element={<BlogCategory />} />
            <Route path="/resources/blog/:category/:slug" element={<BlogPost />} />
            <Route path="/resources/faq" element={<FAQ />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <ChatWidget />
          <MobileWhatsAppButton />
          <Analytics />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;

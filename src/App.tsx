import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ScrollToTop } from "@/components/ScrollToTop";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ServiceBusinesses from "./pages/use-cases/ServiceBusinesses";
import SalesProfessionals from "./pages/use-cases/SalesProfessionals";
import GrowingTeams from "./pages/use-cases/GrowingTeams";
import Entrepreneurs from "./pages/use-cases/Entrepreneurs";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/use-cases/service-businesses" element={<ServiceBusinesses />} />
          <Route path="/use-cases/sales-professionals" element={<SalesProfessionals />} />
          <Route path="/use-cases/growing-teams" element={<GrowingTeams />} />
          <Route path="/use-cases/entrepreneurs" element={<Entrepreneurs />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

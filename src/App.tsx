import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import WebsiteQualityAnalyzer from "./pages/WebsiteQualityAnalyzer.tsx";
import LeadCaptureCrmSync from "./pages/LeadCaptureCrmSync.tsx";
import AiContentPipeline from "./pages/AiContentPipeline.tsx";
import DatabaseSyncReporting from "./pages/DatabaseSyncReporting.tsx";
import MultiStepApproval from "./pages/MultiStepApproval.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/automations/website-quality-analyzer" element={<WebsiteQualityAnalyzer />} />
          <Route path="/automations/lead-capture-crm-sync" element={<LeadCaptureCrmSync />} />
          <Route path="/automations/ai-content-pipeline" element={<AiContentPipeline />} />
          <Route path="/automations/database-sync-reporting" element={<DatabaseSyncReporting />} />
          <Route path="/automations/multi-step-approval" element={<MultiStepApproval />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

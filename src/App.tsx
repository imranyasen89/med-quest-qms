import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Dashboard from "./pages/Dashboard";
import Documents from "./pages/Documents";
import Instruments from "./pages/Instruments";
import KPIs from "./pages/KPIs";
import Risks from "./pages/Risks";
import Audits from "./pages/Audits";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/documents" element={<Documents />} />
            <Route path="/documents/*" element={<Documents />} />
            <Route path="/instruments" element={<Instruments />} />
            <Route path="/instruments/*" element={<Instruments />} />
            <Route path="/kpis" element={<KPIs />} />
            <Route path="/risks" element={<Risks />} />
            <Route path="/risks/*" element={<Risks />} />
            <Route path="/audits" element={<Audits />} />
            <Route path="/audits/*" element={<Audits />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import Challenges from "./pages/Challenges";
import ImpactPage from "./pages/ImpactPage";
import Settings from "./pages/Settings";
import Auth from "./pages/Auth";
import HouseholdSetup from "./pages/HouseholdSetup";
import UtilityInput from "./pages/UtilityInput";
import UsageBreakdown from "./pages/UsageBreakdown";
import Recommendations from "./pages/Recommendations";
import Alerts from "./pages/Alerts";
import Family from "./pages/Family";
import InstitutionDashboard from "./pages/InstitutionDashboard";
import GovernmentDashboard from "./pages/GovernmentDashboard";
import SmartDevices from "./pages/SmartDevices";
import Reports from "./pages/Reports";
import HelpSupport from "./pages/HelpSupport";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/household-setup" element={<HouseholdSetup />} />
          <Route path="/utility-input" element={<UtilityInput />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/analytics" element={<Dashboard />} />
          <Route path="/recommendations" element={<Recommendations />} />
          <Route path="/breakdown" element={<UsageBreakdown />} />
          <Route path="/challenges" element={<Challenges />} />
          <Route path="/impact" element={<ImpactPage />} />
          <Route path="/alerts" element={<Alerts />} />
          <Route path="/family" element={<Family />} />
          <Route path="/devices" element={<SmartDevices />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/help" element={<HelpSupport />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/institution" element={<InstitutionDashboard />} />
          <Route path="/government" element={<GovernmentDashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import BottomNav from "@/components/BottomNav";
import Index from "./pages/Index.tsx";
import SearchPage from "./pages/SearchPage.tsx";
import DoctorProfile from "./pages/DoctorProfile.tsx";
import BookAppointment from "./pages/BookAppointment.tsx";
import AppointmentsPage from "./pages/AppointmentsPage.tsx";
import HealthPage from "./pages/HealthPage.tsx";
import MessagesPage from "./pages/MessagesPage.tsx";
// REMOVED: import AccountPage from "./pages/AccountPage.tsx"; 
import TriagePage from "./pages/TriagePage.tsx";
import DashboardLayout from "./components/DashboardLayout.tsx";
import DashboardOverview from "./pages/dashboard/DashboardOverview.tsx";
import DashboardSchedule from "./pages/dashboard/DashboardSchedule.tsx";
import DashboardPatients from "./pages/dashboard/DashboardPatients.tsx";
import DashboardTriageReports from "./pages/dashboard/DashboardTriageReports.tsx";
import DashboardSettings from "./pages/dashboard/DashboardSettings.tsx";
import NotFound from "./pages/NotFound.tsx";

// ADDED: Your new functional account page
import AccountPage from './features/profile/AccountPage';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Patient routes */}
          <Route path="/" element={<Index />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/doctor/:id" element={<DoctorProfile />} />
          <Route path="/book/:id" element={<BookAppointment />} />
          <Route path="/appointments" element={<AppointmentsPage />} />
          <Route path="/health" element={<HealthPage />} />
          <Route path="/messages" element={<MessagesPage />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/triage" element={<TriagePage />} />

          {/* Doctor Dashboard */}
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<DashboardOverview />} />
            <Route path="schedule" element={<DashboardSchedule />} />
            <Route path="patients" element={<DashboardPatients />} />
            <Route path="triage-reports" element={<DashboardTriageReports />} />
            <Route path="settings" element={<DashboardSettings />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
        <BottomNav />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
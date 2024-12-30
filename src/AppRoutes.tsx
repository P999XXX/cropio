import { Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ResetPassword from "./pages/ResetPassword";
import Components from "./pages/Components";
import DashboardLayout from "./components/layouts/DashboardLayout";
import DashboardHome from "./pages/dashboard/DashboardHome";
import DashboardTeam from "./pages/dashboard/DashboardTeam";
import DashboardSettings from "./pages/dashboard/DashboardSettings";
import DashboardFAQ from "./pages/dashboard/DashboardFAQ";
import DashboardSupport from "./pages/dashboard/DashboardSupport";
import DashboardSubscriptions from "./pages/dashboard/DashboardSubscriptions";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/components" element={<Components />} />
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<DashboardHome />} />
        <Route path="team" element={<DashboardTeam />} />
        <Route path="subscriptions" element={<DashboardSubscriptions />} />
        <Route path="settings" element={<DashboardSettings />} />
        <Route path="faq" element={<DashboardFAQ />} />
        <Route path="support" element={<DashboardSupport />} />
      </Route>
    </Routes>
  );
};
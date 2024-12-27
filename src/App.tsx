import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, Suspense, lazy, useEffect } from "react";
import { LanguageContext } from "@/components/LanguageSwitcher";
import AuthRedirectHandler from "@/components/auth/AuthRedirectHandler";
import ThemeHandler from "@/components/ThemeHandler";

// Lazy load route components
const Index = lazy(() => import("./pages/Index"));
const SignUp = lazy(() => import("./pages/SignUp"));
const SignIn = lazy(() => import("./pages/SignIn"));
const ResetPassword = lazy(() => import("./pages/ResetPassword"));
const Components = lazy(() => import("./pages/Components"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const DashboardTeam = lazy(() => import("./pages/dashboard/DashboardTeam"));
const DashboardCertificates = lazy(() => import("./pages/dashboard/DashboardCertificates"));
const DashboardProducts = lazy(() => import("./pages/dashboard/DashboardProducts"));
const DashboardMarket = lazy(() => import("./pages/dashboard/DashboardMarket"));
const DashboardTrading = lazy(() => import("./pages/dashboard/DashboardTrading"));
const DashboardOrders = lazy(() => import("./pages/dashboard/DashboardOrders"));
const DashboardReturns = lazy(() => import("./pages/dashboard/DashboardReturns"));
const DashboardPayments = lazy(() => import("./pages/dashboard/DashboardPayments"));
const DashboardReviews = lazy(() => import("./pages/dashboard/DashboardReviews"));
const DashboardSettings = lazy(() => import("./pages/dashboard/DashboardSettings"));
const DashboardFAQ = lazy(() => import("./pages/dashboard/DashboardFAQ"));
const DashboardSupport = lazy(() => import("./pages/dashboard/DashboardSupport"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60000,
      gcTime: 300000,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const AppContent = () => {
  const [currentLanguage, setCurrentLanguage] = useState("en");

  useEffect(() => {
    const savedLanguage = localStorage.getItem("preferredLanguage");
    if (savedLanguage) {
      setCurrentLanguage(savedLanguage);
    }
  }, []);

  return (
    <LanguageContext.Provider value={{ currentLanguage, setLanguage: setCurrentLanguage }}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <AuthRedirectHandler />
        <ThemeHandler />
        <Suspense fallback={
          <div className="flex items-center justify-center min-h-screen">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        }>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/components" element={<Components />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/team" element={<DashboardTeam />} />
            <Route path="/dashboard/certificates" element={<DashboardCertificates />} />
            <Route path="/dashboard/products" element={<DashboardProducts />} />
            <Route path="/dashboard/market" element={<DashboardMarket />} />
            <Route path="/dashboard/trading" element={<DashboardTrading />} />
            <Route path="/dashboard/orders" element={<DashboardOrders />} />
            <Route path="/dashboard/returns" element={<DashboardReturns />} />
            <Route path="/dashboard/payments" element={<DashboardPayments />} />
            <Route path="/dashboard/reviews" element={<DashboardReviews />} />
            <Route path="/dashboard/settings" element={<DashboardSettings />} />
            <Route path="/dashboard/faq" element={<DashboardFAQ />} />
            <Route path="/dashboard/support" element={<DashboardSupport />} />
          </Routes>
        </Suspense>
      </TooltipProvider>
    </LanguageContext.Provider>
  );
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
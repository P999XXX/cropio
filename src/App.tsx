import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, Suspense, lazy, useEffect } from "react";
import { LanguageContext } from "@/components/LanguageSwitcher";
import AuthRedirectHandler from "@/components/auth/AuthRedirectHandler";
import ThemeHandler from "@/components/ThemeHandler";

// Configure QueryClient with optimized settings
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 300000, // 5 minutes
      gcTime: 3600000,   // 1 hour
      retry: 1,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
    },
  },
});

// Lazy load route components with loading chunks
const Index = lazy(() => import("./pages/Index" /* webpackChunkName: "index" */));
const SignUp = lazy(() => import("./pages/SignUp" /* webpackChunkName: "auth" */));
const SignIn = lazy(() => import("./pages/SignIn" /* webpackChunkName: "auth" */));
const ResetPassword = lazy(() => import("./pages/ResetPassword" /* webpackChunkName: "auth" */));
const Components = lazy(() => import("./pages/Components" /* webpackChunkName: "components" */));
const Dashboard = lazy(() => import("./pages/Dashboard" /* webpackChunkName: "dashboard" */));

// Loading spinner component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
  </div>
);

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
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/components" element={<Components />} />
            <Route path="/dashboard/*" element={<Dashboard />} />
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
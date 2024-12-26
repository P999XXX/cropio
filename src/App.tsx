import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { useEffect, useState, Suspense } from "react";
import { LanguageContext } from "@/components/LanguageSwitcher";
import { supabase } from "@/integrations/supabase/client";
import { lazy } from "react";

// Lazy load route components
const Index = lazy(() => import("./pages/Index"));
const SignUp = lazy(() => import("./pages/SignUp"));
const SignIn = lazy(() => import("./pages/SignIn"));
const ResetPassword = lazy(() => import("./pages/ResetPassword"));
const Components = lazy(() => import("./pages/Components"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60000, // 1 minute
      gcTime: 300000, // 5 minutes (formerly cacheTime)
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

// ... keep existing code (AppContent component definition)

const AppContent = () => {
  const navigate = useNavigate();
  const [currentLanguage, setCurrentLanguage] = useState("en");

  const updateThemeColors = (isDark: boolean) => {
    const color = isDark ? '#1A1F2C' : '#FFFFFF';
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', color);
    document.querySelector('meta[name="msapplication-navbutton-color"]')?.setAttribute('content', color);
    document.querySelector('meta[name="apple-mobile-web-app-status-bar-style"]')?.setAttribute('content', color);
  };

  useEffect(() => {
    const savedLanguage = localStorage.getItem("preferredLanguage");
    if (savedLanguage) {
      setCurrentLanguage(savedLanguage);
    }

    // Check for saved theme preference
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      if (savedTheme === 'dark') {
        document.documentElement.classList.add('dark');
        updateThemeColors(true);
      } else {
        document.documentElement.classList.remove('dark');
        updateThemeColors(false);
      }
    } else {
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.classList.add('dark');
        updateThemeColors(true);
        localStorage.setItem("theme", "dark");
      } else {
        localStorage.setItem("theme", "light");
        updateThemeColors(false);
      }
    }

    // Handle email confirmation and password reset redirects
    const handleAuthRedirects = async () => {
      console.log("=== Starting auth redirect handling ===");
      
      try {
        // Get current URL parameters
        const url = new URL(window.location.href);
        const searchParams = new URLSearchParams(url.search);
        const hashParams = new URLSearchParams(url.hash.replace('#', ''));
        
        console.log("Current URL:", url.toString());
        console.log("Search params:", Object.fromEntries(searchParams.entries()));
        console.log("Hash params:", Object.fromEntries(hashParams.entries()));
        
        // Check for recovery token in both hash and search params
        const accessToken = hashParams.get('access_token') || searchParams.get('access_token');
        const type = hashParams.get('type') || searchParams.get('type');
        
        console.log("Token check:", { accessToken: !!accessToken, type });
        
        if (type === 'recovery' && accessToken) {
          console.log("Valid recovery token detected - redirecting to reset-password");
          // Set the session before redirecting
          const refreshToken = hashParams.get('refresh_token') || searchParams.get('refresh_token');
          if (refreshToken) {
            await supabase.auth.setSession({
              access_token: accessToken,
              refresh_token: refreshToken
            });
          }
          navigate('/reset-password', { replace: true });
          return;
        }
        
        // Handle email confirmation
        if (url.pathname.includes('/auth/callback')) {
          console.log("Auth callback detected");
          if (type === 'email_confirmation') {
            const { data: { session }, error } = await supabase.auth.getSession();
            console.log("Email confirmation - Session check:", { session: !!session, error });
            
            if (!error && session) {
              navigate('/signin', { replace: true });
            }
          }
        }
      } catch (error) {
        console.error("Auth redirect error:", error);
        navigate('/signin', { replace: true });
      }
      
      console.log("=== Auth redirect handling complete ===");
    };

    handleAuthRedirects();
  }, [navigate]);

  return (
    <LanguageContext.Provider value={{ currentLanguage, setLanguage: setCurrentLanguage }}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
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

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { LanguageContext } from "@/components/LanguageSwitcher";
import { supabase } from "@/integrations/supabase/client";
import Index from "./pages/Index";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import ResetPassword from "./pages/ResetPassword";
import Components from "./pages/Components";

const queryClient = new QueryClient();

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
    // Initialize language from localStorage
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
      console.log("Handling auth redirects");
      const { hash, pathname, search } = window.location;
      
      // Log current URL information for debugging
      console.log("Current URL info:", { hash, pathname, search });
      
      // Handle hash-based redirects (old style)
      if (hash) {
        console.log("Processing hash-based redirect");
        const hashParams = new URLSearchParams(hash.substring(1));
        const type = hashParams.get('type');
        console.log("Hash params type:", type);
        
        if (type === 'recovery') {
          console.log("Hash: Redirecting to reset-password");
          navigate('/reset-password');
          return;
        }
      }
      
      // Handle pathname-based redirects (new style)
      if (pathname.includes('/auth/callback')) {
        console.log("Processing pathname-based redirect");
        const params = new URLSearchParams(search);
        const type = params.get('type');
        console.log("Search params type:", type);
        
        if (type === 'recovery') {
          console.log("Pathname: Redirecting to reset-password");
          navigate('/reset-password');
          return;
        }
        
        // Only handle email confirmation if it's not a recovery
        if (type === 'email_confirmation') {
          const { data: { session }, error } = await supabase.auth.getSession();
          if (!error && session) {
            navigate('/signin');
          }
        }
      }
    };

    handleAuthRedirects();
  }, [navigate]);

  return (
    <LanguageContext.Provider value={{ currentLanguage, setLanguage: setCurrentLanguage }}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/components" element={<Components />} />
        </Routes>
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
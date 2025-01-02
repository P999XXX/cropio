import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { errorToastStyle } from "@/utils/toast-styles";
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
import { SidebarProvider } from "@/components/ui/sidebar";
import AuthRedirectHandler from "./components/auth/AuthRedirectHandler";

// Protected Route wrapper component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) {
          console.error("Auth error:", error);
          toast.error("Authentication error. Please sign in again.", errorToastStyle);
          setIsAuthenticated(false);
        } else {
          setIsAuthenticated(!!session);
        }
      } catch (error) {
        console.error("Session check error:", error);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("Auth state changed:", event);
      setIsAuthenticated(!!session);
      setIsLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  if (isLoading) {
    return null; // Or a loading spinner
  }

  return isAuthenticated ? children : <Navigate to="/signin" replace />;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Index />,
  },
  {
    path: "/signin",
    element: <SignIn />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/reset-password",
    element: <ResetPassword />,
  },
  {
    path: "/auth/callback",
    element: <AuthRedirectHandler />,
  },
  {
    path: "/components",
    element: <Components />,
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <SidebarProvider defaultOpen={true}>
          <DashboardLayout>
            <DashboardHome />
          </DashboardLayout>
        </SidebarProvider>
      </ProtectedRoute>
    ),
  },
  {
    path: "/dashboard/team",
    element: (
      <ProtectedRoute>
        <SidebarProvider defaultOpen={true}>
          <DashboardLayout>
            <DashboardTeam />
          </DashboardLayout>
        </SidebarProvider>
      </ProtectedRoute>
    ),
  },
  {
    path: "/dashboard/subscriptions",
    element: (
      <ProtectedRoute>
        <SidebarProvider defaultOpen={true}>
          <DashboardLayout>
            <DashboardSubscriptions />
          </DashboardLayout>
        </SidebarProvider>
      </ProtectedRoute>
    ),
  },
  {
    path: "/dashboard/settings",
    element: (
      <ProtectedRoute>
        <SidebarProvider defaultOpen={true}>
          <DashboardLayout>
            <DashboardSettings />
          </DashboardLayout>
        </SidebarProvider>
      </ProtectedRoute>
    ),
  },
  {
    path: "/dashboard/faq",
    element: (
      <ProtectedRoute>
        <SidebarProvider defaultOpen={true}>
          <DashboardLayout>
            <DashboardFAQ />
          </DashboardLayout>
        </SidebarProvider>
      </ProtectedRoute>
    ),
  },
  {
    path: "/dashboard/support",
    element: (
      <ProtectedRoute>
        <SidebarProvider defaultOpen={true}>
          <DashboardLayout>
            <DashboardSupport />
          </DashboardLayout>
        </SidebarProvider>
      </ProtectedRoute>
    ),
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
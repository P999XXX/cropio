import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
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
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

// Protected Route wrapper component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsAuthenticated(!!session);
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setIsAuthenticated(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Show nothing while checking authentication
  if (isAuthenticated === null) {
    return null;
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
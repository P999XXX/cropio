import { createBrowserRouter, RouterProvider } from "react-router-dom";
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
    path: "/components",
    element: <Components />,
  },
  {
    path: "/dashboard",
    element: (
      <SidebarProvider defaultOpen={true}>
        <DashboardLayout>
          <DashboardHome />
        </DashboardLayout>
      </SidebarProvider>
    ),
  },
  {
    path: "/dashboard/team",
    element: (
      <SidebarProvider defaultOpen={true}>
        <DashboardLayout>
          <DashboardTeam />
        </DashboardLayout>
      </SidebarProvider>
    ),
  },
  {
    path: "/dashboard/subscriptions",
    element: (
      <SidebarProvider defaultOpen={true}>
        <DashboardLayout>
          <DashboardSubscriptions />
        </DashboardLayout>
      </SidebarProvider>
    ),
  },
  {
    path: "/dashboard/settings",
    element: (
      <SidebarProvider defaultOpen={true}>
        <DashboardLayout>
          <DashboardSettings />
        </DashboardLayout>
      </SidebarProvider>
    ),
  },
  {
    path: "/dashboard/faq",
    element: (
      <SidebarProvider defaultOpen={true}>
        <DashboardLayout>
          <DashboardFAQ />
        </DashboardLayout>
      </SidebarProvider>
    ),
  },
  {
    path: "/dashboard/support",
    element: (
      <SidebarProvider defaultOpen={true}>
        <DashboardLayout>
          <DashboardSupport />
        </DashboardLayout>
      </SidebarProvider>
    ),
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
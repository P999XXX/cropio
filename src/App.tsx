import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy, Suspense } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import DashboardLayout from "./components/layouts/DashboardLayout";

// Lazy load all pages
const Index = lazy(() => import("./pages/Index"));
const SignIn = lazy(() => import("./pages/SignIn"));
const SignUp = lazy(() => import("./pages/SignUp"));
const ResetPassword = lazy(() => import("./pages/ResetPassword"));
const Components = lazy(() => import("./pages/Components"));
const DashboardHome = lazy(() => import("./pages/dashboard/DashboardHome"));
const DashboardTeam = lazy(() => import("./pages/dashboard/DashboardTeam"));
const DashboardSettings = lazy(() => import("./pages/dashboard/DashboardSettings"));
const DashboardFAQ = lazy(() => import("./pages/dashboard/DashboardFAQ"));
const DashboardSupport = lazy(() => import("./pages/dashboard/DashboardSupport"));
const DashboardSubscriptions = lazy(() => import("./pages/dashboard/DashboardSubscriptions"));

// Loading component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
  </div>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <Index />
      </Suspense>
    ),
  },
  {
    path: "/signin",
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <SignIn />
      </Suspense>
    ),
  },
  {
    path: "/signup",
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <SignUp />
      </Suspense>
    ),
  },
  {
    path: "/reset-password",
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <ResetPassword />
      </Suspense>
    ),
  },
  {
    path: "/components",
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <Components />
      </Suspense>
    ),
  },
  {
    path: "/dashboard",
    element: (
      <SidebarProvider defaultOpen={true}>
        <DashboardLayout>
          <Suspense fallback={<LoadingSpinner />}>
            <DashboardHome />
          </Suspense>
        </DashboardLayout>
      </SidebarProvider>
    ),
  },
  {
    path: "/dashboard/team",
    element: (
      <SidebarProvider defaultOpen={true}>
        <DashboardLayout>
          <Suspense fallback={<LoadingSpinner />}>
            <DashboardTeam />
          </Suspense>
        </DashboardLayout>
      </SidebarProvider>
    ),
  },
  {
    path: "/dashboard/subscriptions",
    element: (
      <SidebarProvider defaultOpen={true}>
        <DashboardLayout>
          <Suspense fallback={<LoadingSpinner />}>
            <DashboardSubscriptions />
          </Suspense>
        </DashboardLayout>
      </SidebarProvider>
    ),
  },
  {
    path: "/dashboard/settings",
    element: (
      <SidebarProvider defaultOpen={true}>
        <DashboardLayout>
          <Suspense fallback={<LoadingSpinner />}>
            <DashboardSettings />
          </Suspense>
        </DashboardLayout>
      </SidebarProvider>
    ),
  },
  {
    path: "/dashboard/faq",
    element: (
      <SidebarProvider defaultOpen={true}>
        <DashboardLayout>
          <Suspense fallback={<LoadingSpinner />}>
            <DashboardFAQ />
          </Suspense>
        </DashboardLayout>
      </SidebarProvider>
    ),
  },
  {
    path: "/dashboard/support",
    element: (
      <SidebarProvider defaultOpen={true}>
        <DashboardLayout>
          <Suspense fallback={<LoadingSpinner />}>
            <DashboardSupport />
          </Suspense>
        </DashboardLayout>
      </SidebarProvider>
    ),
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
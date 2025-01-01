import { createHashRouter, RouterProvider } from "react-router-dom";
import { lazy, Suspense } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import DashboardLayout from "./components/layouts/DashboardLayout";

// Lazy load all pages with preloading for better performance
const Index = lazy(() => import("./pages/Index"));
const SignIn = lazy(() => {
  const module = import("./pages/SignIn");
  return module;
});
const SignUp = lazy(() => {
  const module = import("./pages/SignUp");
  return module;
});
const ResetPassword = lazy(() => {
  const module = import("./pages/ResetPassword");
  return module;
});
const Components = lazy(() => import("./pages/Components"));
const DashboardHome = lazy(() => import("./pages/dashboard/DashboardHome"));
const DashboardTeam = lazy(() => import("./pages/dashboard/DashboardTeam"));
const DashboardSettings = lazy(() => import("./pages/dashboard/DashboardSettings"));
const DashboardFAQ = lazy(() => import("./pages/dashboard/DashboardFAQ"));
const DashboardSupport = lazy(() => import("./pages/dashboard/DashboardSupport"));
const DashboardSubscriptions = lazy(() => import("./pages/dashboard/DashboardSubscriptions"));

// Enhanced loading spinner with ARIA attributes for accessibility
const LoadingSpinner = () => (
  <div 
    className="flex items-center justify-center min-h-screen bg-background"
    role="status"
    aria-label="Loading"
  >
    <div 
      className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"
      aria-hidden="true"
    >
      <span className="sr-only">Loading...</span>
    </div>
  </div>
);

const router = createHashRouter([
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
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <RouterProvider router={router} />
    </Suspense>
  );
}

export default App;
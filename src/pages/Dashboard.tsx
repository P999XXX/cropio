import { Routes, Route, useLocation } from "react-router-dom";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { lazy, Suspense } from "react";

// Lazy load dashboard pages with prefetch
const DashboardHome = lazy(() => import("./dashboard/DashboardHome" /* webpackChunkName: "dashboard-home" */));
const DashboardTeam = lazy(() => import("./dashboard/DashboardTeam" /* webpackChunkName: "dashboard-team" */));
const DashboardCertificates = lazy(() => import("./dashboard/DashboardCertificates" /* webpackChunkName: "dashboard-certificates" */));
const DashboardProducts = lazy(() => import("./dashboard/DashboardProducts" /* webpackChunkName: "dashboard-products" */));
const DashboardMarket = lazy(() => import("./dashboard/DashboardMarket" /* webpackChunkName: "dashboard-market" */));
const DashboardTrading = lazy(() => import("./dashboard/DashboardTrading" /* webpackChunkName: "dashboard-trading" */));
const DashboardOrders = lazy(() => import("./dashboard/DashboardOrders" /* webpackChunkName: "dashboard-orders" */));
const DashboardReturns = lazy(() => import("./dashboard/DashboardReturns" /* webpackChunkName: "dashboard-returns" */));
const DashboardPayments = lazy(() => import("./dashboard/DashboardPayments" /* webpackChunkName: "dashboard-payments" */));
const DashboardReviews = lazy(() => import("./dashboard/DashboardReviews" /* webpackChunkName: "dashboard-reviews" */));
const DashboardSettings = lazy(() => import("./dashboard/DashboardSettings" /* webpackChunkName: "dashboard-settings" */));
const DashboardFAQ = lazy(() => import("./dashboard/DashboardFAQ" /* webpackChunkName: "dashboard-faq" */));
const DashboardSupport = lazy(() => import("./dashboard/DashboardSupport" /* webpackChunkName: "dashboard-support" */));

// Loading spinner component for dashboard sections
const DashboardLoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-[200px]">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
  </div>
);

const Dashboard = () => {
  const location = useLocation();

  // Prefetch adjacent routes
  useEffect(() => {
    const adjacentRoutes = [
      "./dashboard/DashboardHome",
      "./dashboard/DashboardTeam",
      "./dashboard/DashboardProducts"
    ];
    
    adjacentRoutes.forEach(route => {
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = route;
      document.head.appendChild(link);
    });
  }, [location]);

  return (
    <DashboardLayout>
      <Suspense fallback={<DashboardLoadingSpinner />}>
        <Routes>
          <Route index element={<DashboardHome />} />
          <Route path="team" element={<DashboardTeam />} />
          <Route path="certificates" element={<DashboardCertificates />} />
          <Route path="products" element={<DashboardProducts />} />
          <Route path="market" element={<DashboardMarket />} />
          <Route path="trading" element={<DashboardTrading />} />
          <Route path="orders" element={<DashboardOrders />} />
          <Route path="returns" element={<DashboardReturns />} />
          <Route path="payments" element={<DashboardPayments />} />
          <Route path="reviews" element={<DashboardReviews />} />
          <Route path="settings" element={<DashboardSettings />} />
          <Route path="faq" element={<DashboardFAQ />} />
          <Route path="support" element={<DashboardSupport />} />
        </Routes>
      </Suspense>
    </DashboardLayout>
  );
};

export default Dashboard;
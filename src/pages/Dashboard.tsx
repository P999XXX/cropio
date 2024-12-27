import { Routes, Route } from "react-router-dom";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { lazy, Suspense } from "react";

// Lazy load dashboard pages
const DashboardHome = lazy(() => import("./dashboard/DashboardHome"));
const DashboardTeam = lazy(() => import("./dashboard/DashboardTeam"));
const DashboardCertificates = lazy(() => import("./dashboard/DashboardCertificates"));
const DashboardProducts = lazy(() => import("./dashboard/DashboardProducts"));
const DashboardMarket = lazy(() => import("./dashboard/DashboardMarket"));
const DashboardTrading = lazy(() => import("./dashboard/DashboardTrading"));
const DashboardOrders = lazy(() => import("./dashboard/DashboardOrders"));
const DashboardReturns = lazy(() => import("./dashboard/DashboardReturns"));
const DashboardPayments = lazy(() => import("./dashboard/DashboardPayments"));
const DashboardReviews = lazy(() => import("./dashboard/DashboardReviews"));
const DashboardSettings = lazy(() => import("./dashboard/DashboardSettings"));
const DashboardFAQ = lazy(() => import("./dashboard/DashboardFAQ"));
const DashboardSupport = lazy(() => import("./dashboard/DashboardSupport"));

const Dashboard = () => {
  return (
    <DashboardLayout>
      <Suspense fallback={
        <div className="flex items-center justify-center min-h-[200px]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      }>
        <Routes>
          <Route path="/" element={<DashboardHome />} />
          <Route path="/team" element={<DashboardTeam />} />
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

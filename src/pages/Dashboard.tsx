import { Routes, Route } from "react-router-dom";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { lazy, Suspense } from "react";

// Lazy load dashboard pages
const DashboardHome = lazy(() => import("./dashboard/DashboardHome"));
const DashboardTeam = lazy(() => import("./dashboard/DashboardTeam"));

const Dashboard = () => {
  return (
    <DashboardLayout>
      <Suspense fallback={
        <div className="flex items-center justify-center min-h-[200px]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      }>
        <Routes>
          <Route index element={<DashboardHome />} />
          <Route path="team" element={<DashboardTeam />} />
        </Routes>
      </Suspense>
    </DashboardLayout>
  );
};

export default Dashboard;
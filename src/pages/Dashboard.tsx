import DashboardLayout from "@/components/layouts/DashboardLayout";

const Dashboard = () => {
  return (
    <DashboardLayout>
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome to your dashboard. This is where you can manage all your activities.
        </p>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
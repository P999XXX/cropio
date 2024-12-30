import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const DashboardSubscriptions = () => {
  return (
    <div className="subscriptions-page space-y-4 px-1">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold">Subscriptions</h1>
        <p className="text-muted-foreground text-[0.775rem]">
          Manage your subscription plans and billing
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Current Plan</CardTitle>
          <CardDescription>You are currently on the Free plan</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Upgrade your plan to access premium features and increased limits.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardSubscriptions;
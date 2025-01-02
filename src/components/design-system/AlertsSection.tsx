import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal, AlertCircle } from "lucide-react";

export const AlertsSection = () => {
  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-semibold">Alerts</h2>
      <div className="grid gap-4">
        <Alert>
          <Terminal className="h-4 w-4" />
          <AlertTitle>Default Alert</AlertTitle>
          <AlertDescription>
            This is a default alert message.
          </AlertDescription>
        </Alert>
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error Alert</AlertTitle>
          <AlertDescription>
            This is an error alert message.
          </AlertDescription>
        </Alert>
      </div>
    </section>
  );
};
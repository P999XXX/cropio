import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const TabsSection = () => {
  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-semibold">Tabs</h2>
      <Tabs defaultValue="account" className="w-full">
        <TabsList>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
        </TabsList>
        <TabsContent value="account" className="p-4">
          Account settings content goes here.
        </TabsContent>
        <TabsContent value="password" className="p-4">
          Password settings content goes here.
        </TabsContent>
      </Tabs>
    </section>
  );
};
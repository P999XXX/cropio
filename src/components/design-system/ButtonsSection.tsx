import { Button } from "@/components/ui/button";

export const ButtonsSection = () => {
  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-semibold">Buttons</h2>
      <div className="flex flex-wrap gap-4">
        <Button>Default Button</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="destructive">Destructive</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="link">Link</Button>
      </div>
    </section>
  );
};
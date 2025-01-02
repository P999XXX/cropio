import { Badge } from "@/components/ui/badge";

export const BadgesSection = () => {
  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-semibold">Badges</h2>
      <div className="flex flex-wrap gap-4">
        <Badge>Default</Badge>
        <Badge variant="secondary">Secondary</Badge>
        <Badge variant="outline">Outline</Badge>
        <Badge variant="destructive">Destructive</Badge>
      </div>
    </section>
  );
};
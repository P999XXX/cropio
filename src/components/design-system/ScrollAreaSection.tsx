import { ScrollArea } from "@/components/ui/scroll-area";

export const ScrollAreaSection = () => {
  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-semibold">Scroll Area</h2>
      <ScrollArea className="h-[200px] w-full rounded-md border p-4">
        <div className="space-y-4">
          <h4 className="text-sm font-medium leading-none">Scroll Example</h4>
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="text-sm">
              Item {i + 1}
            </div>
          ))}
        </div>
      </ScrollArea>
    </section>
  );
};
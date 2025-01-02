import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export const PopoverSection = () => {
  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-semibold">Popovers</h2>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">Open Popover</Button>
        </PopoverTrigger>
        <PopoverContent className="w-80">
          <div className="grid gap-4">
            <div className="space-y-2">
              <h4 className="font-medium leading-none">Popover Example</h4>
              <p className="text-sm text-muted-foreground">
                This is an example of a popover component.
              </p>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </section>
  );
};
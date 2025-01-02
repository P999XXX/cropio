import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export const DialogsSection = () => {
  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-semibold">Dialogs</h2>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Open Dialog</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Example Dialog</DialogTitle>
            <DialogDescription>
              This is an example of a dialog component.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            Dialog content goes here.
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};
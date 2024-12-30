import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { TeamMemberRole } from "@/types/team";

const inviteSchema = z.object({
  email: z.string().email("Invalid email address"),
  role: z.enum(["administrator", "editor", "readonly"] as const),
});

type InviteFormData = z.infer<typeof inviteSchema>;

interface InviteMemberDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const InviteMemberDialog = ({
  open,
  onOpenChange,
}: InviteMemberDialogProps) => {
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<InviteFormData>({
    resolver: zodResolver(inviteSchema),
    defaultValues: {
      email: "",
      role: "readonly",
    },
  });

  const inviteMutation = useMutation({
    mutationFn: async (values: InviteFormData) => {
      const { data: authData, error: authError } = await supabase.auth.getUser();
      if (authError) {
        throw new Error("Authentication error: " + authError.message);
      }

      if (!authData.user) {
        throw new Error("No authenticated user found");
      }

      const { error: insertError } = await supabase.from("team_members").insert({
        email: values.email,
        role: values.role,
        invited_by: authData.user.id,
        profile_id: authData.user.id,
        status: "pending",
      });

      if (insertError) {
        throw new Error("Failed to create team member: " + insertError.message);
      }

      return true;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["team-members"] });
      toast.success("Team member invited successfully");
      form.reset();
      onOpenChange(false);
    },
    onError: (error: Error) => {
      console.error("Error inviting team member:", error);
      toast.error(error.message);
    },
  });

  const onSubmit = async (values: InviteFormData) => {
    setIsLoading(true);
    try {
      await inviteMutation.mutateAsync(values);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="fixed left-[50%] top-[50%] z-50 grid w-[calc(100%-2rem)] max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg rounded-lg">
        <DialogHeader>
          <DialogTitle className="text-[1.3rem] font-semibold">Invite Team Member</DialogTitle>
          <DialogDescription className="pt-4">
            Send an invitation to join your team. They'll receive an email with
            instructions.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground text-sm font-medium">Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter email address"
                      type="email"
                      className="h-10 px-3 py-2 text-sm rounded-md border border-input bg-background"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground text-sm font-medium">Role</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="h-10 px-3 py-2 text-sm rounded-md border border-input bg-background">
                        <SelectValue placeholder="Select a role" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="readonly">Read Only</SelectItem>
                      <SelectItem value="editor">Editor</SelectItem>
                      <SelectItem value="administrator">Administrator</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex flex-col gap-3 mt-4 sm:flex-row sm:justify-end">
              <Button
                type="submit"
                disabled={isLoading}
                variant="primary"
                className="order-1 sm:order-2 w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90"
              >
                {isLoading ? "Sending..." : "Send Invitation"}
              </Button>
              <Button
                type="button"
                onClick={() => onOpenChange(false)}
                disabled={isLoading}
                variant="secondary"
                className="order-2 sm:order-1 w-full sm:w-auto bg-secondary text-secondary-foreground hover:bg-secondary/80"
              >
                Cancel
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
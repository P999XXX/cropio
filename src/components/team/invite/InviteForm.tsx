import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
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
import { Button } from "@/components/ui/button";

const inviteSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  role: z.enum(["administrator", "editor", "readonly"] as const),
});

export type InviteFormData = z.infer<typeof inviteSchema>;

interface InviteFormProps {
  onSubmit: (values: InviteFormData) => Promise<void>;
  isLoading: boolean;
  onCancel: () => void;
}

export const InviteForm = ({ onSubmit, isLoading, onCancel }: InviteFormProps) => {
  const form = useForm<InviteFormData>({
    resolver: zodResolver(inviteSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      role: "readonly",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="!text-foreground">First Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter first name"
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
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="!text-foreground">Last Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter last name"
                    className="h-10 px-3 py-2 text-sm rounded-md border border-input bg-background"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="!text-foreground">Email</FormLabel>
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
              <FormLabel className="!text-foreground">Role</FormLabel>
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

        <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 pt-4">
          <Button
            type="button"
            onClick={onCancel}
            disabled={isLoading}
            variant="secondary"
            className="order-2 sm:order-1 w-full sm:w-auto bg-secondary text-secondary-foreground hover:bg-secondary/80"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isLoading}
            variant="primary"
            className="order-1 sm:order-2 w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90"
          >
            {isLoading ? "Sending..." : "Send Invitation"}
          </Button>
        </div>
      </form>
    </Form>
  );
};
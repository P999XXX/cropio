import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
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

const formSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  role: z.enum(["administrator", "editor", "readonly"], {
    required_error: "Please select a role",
  }),
});

export type InviteFormData = z.infer<typeof formSchema>;

interface InviteFormProps {
  onSubmit: (values: InviteFormData) => void;
  isLoading: boolean;
  onCancel: () => void;
}

export const InviteForm = ({ onSubmit, isLoading, onCancel }: InviteFormProps) => {
  const form = useForm<InviteFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      role: "readonly",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[0.925rem]">First Name</FormLabel>
                <FormControl>
                  <Input 
                    {...field} 
                    className="h-10 text-[0.925rem] bg-background border-input" 
                    placeholder="John"
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
                <FormLabel className="text-[0.925rem]">Last Name</FormLabel>
                <FormControl>
                  <Input 
                    {...field} 
                    className="h-10 text-[0.925rem] bg-background border-input" 
                    placeholder="Doe"
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
              <FormLabel className="text-[0.925rem]">Email Address</FormLabel>
              <FormControl>
                <Input 
                  {...field} 
                  type="email"
                  className="h-10 text-[0.925rem] bg-background border-input" 
                  placeholder="john.doe@example.com"
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
              <FormLabel className="text-[0.925rem]">Role</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="h-10 text-[0.925rem] bg-background border-input">
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="bg-background border border-border">
                  <SelectItem value="administrator" className="text-[0.925rem]">Administrator</SelectItem>
                  <SelectItem value="editor" className="text-[0.925rem]">Editor</SelectItem>
                  <SelectItem value="readonly" className="text-[0.925rem]">Read Only</SelectItem>
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
            className="h-10 px-4 text-[0.925rem]"
          >
            {isLoading ? "Inviting..." : "Send Invitation"}
          </Button>
          <Button
            type="button"
            variant="secondary"
            onClick={onCancel}
            className="h-10 px-4 text-[0.925rem]"
          >
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
};
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
import { useInviteMember } from "./useInviteMember";

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
  onOpenChange: (open: boolean) => void;
}

export const InviteForm = ({ onOpenChange }: InviteFormProps) => {
  const { mutate: inviteMember, isPending } = useInviteMember(() => {
    onOpenChange(false);
  });

  const form = useForm<InviteFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      role: "readonly",
    },
  });

  const onSubmit = (values: InviteFormData) => {
    inviteMember(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col h-full">
        <div className="flex-grow space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[0.875rem]">First Name</FormLabel>
                  <FormControl>
                    <Input 
                      {...field} 
                      className="h-10 text-[0.875rem] bg-background border-input" 
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
                  <FormLabel className="text-[0.875rem]">Last Name</FormLabel>
                  <FormControl>
                    <Input 
                      {...field} 
                      className="h-10 text-[0.875rem] bg-background border-input" 
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
                <FormLabel className="text-[0.875rem]">Email Address</FormLabel>
                <FormControl>
                  <Input 
                    {...field} 
                    type="email"
                    className="h-10 text-[0.875rem] bg-background border-input" 
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
                <FormLabel className="text-[0.875rem]">Role</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="h-10 text-[0.875rem] bg-background border-input">
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="z-[151] bg-background border border-border">
                    <SelectItem value="administrator" className="text-[0.875rem]">Administrator</SelectItem>
                    <SelectItem value="editor" className="text-[0.875rem]">Editor</SelectItem>
                    <SelectItem value="readonly" className="text-[0.875rem]">Read Only</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="sticky bottom-0 pt-4 mt-4 border-t border-border bg-background">
          <Button
            type="submit"
            disabled={isPending}
            variant="primary"
            className="w-full h-10 text-[0.825rem]"
          >
            {isPending ? "Sending Invitation..." : "Send Invitation"}
          </Button>
        </div>
      </form>
    </Form>
  );
};
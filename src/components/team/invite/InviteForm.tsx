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
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const formSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  role: z.enum(["administrator", "editor", "readonly"], {
    required_error: "Please select a role",
  }),
});

export type InviteFormData = z.infer<typeof formSchema>;

export const InviteForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<InviteFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      role: "readonly",
    },
  });

  const handleSubmit = async (values: InviteFormData) => {
    setIsLoading(true);
    try {
      const { data: authData, error: authError } = await supabase.auth.getUser();
      if (authError) throw new Error("Authentication error: " + authError.message);
      if (!authData.user) throw new Error("No authenticated user found");

      const { error: insertError } = await supabase.from("team_members").insert({
        email: values.email,
        role: values.role,
        invited_by: authData.user.id,
        profile_id: authData.user.id,
        status: "pending",
        first_name: values.firstName,
        last_name: values.lastName,
      });

      if (insertError) {
        if (insertError.code === "42501") {
          throw new Error("You don't have permission to invite team members.");
        }
        throw new Error("Failed to create team member: " + insertError.message);
      }

      toast.success("Team member invited successfully");
    } catch (error: any) {
      console.error("Error inviting team member:", error);
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-2">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem className="mt-0">
                <FormLabel className="text-[0.775rem]">First Name</FormLabel>
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
              <FormItem className="mt-0">
                <FormLabel className="text-[0.775rem]">Last Name</FormLabel>
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
            <FormItem className="mt-0">
              <FormLabel className="text-[0.775rem]">Email Address</FormLabel>
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
            <FormItem className="mt-0">
              <FormLabel className="text-[0.775rem]">Role</FormLabel>
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

        <div className="flex justify-end mt-4">
          <Button
            type="submit"
            disabled={isLoading}
            className="h-10 px-4 text-[0.925rem]"
          >
            {isLoading ? "Inviting..." : "Send Invitation"}
          </Button>
        </div>
      </form>
    </Form>
  );
};
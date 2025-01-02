import { z } from "zod";

const nameRegex = /^[a-zA-Z]{3,}$/;

export const stepTwoSchema = z.object({
  firstName: z.string()
    .min(3, "First name must be at least 3 characters")
    .regex(nameRegex, "First name must contain only letters and be at least 3 characters"),
  lastName: z.string()
    .min(3, "Last name must be at least 3 characters")
    .regex(nameRegex, "Last name must contain only letters and be at least 3 characters"),
  email: z.string()
    .email("Invalid email address"),
  password: z.string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
  confirmPassword: z.string(),
  acceptTerms: z.boolean().refine(val => val === true, {
    message: "You must accept the terms and conditions",
  }),
  acceptPrivacy: z.boolean().refine(val => val === true, {
    message: "You must accept the privacy policy",
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export type StepTwoFormData = z.infer<typeof stepTwoSchema>;
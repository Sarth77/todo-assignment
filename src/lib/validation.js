import * as z from "zod";
export const signUpFormSchema = z.object({
    name: z.string().min(3, "Invalid name").max(100),
    email: z.string().email("Invalid email").min(8, "Email is required"),
    password: z
        .string()
        .min(1, "Password is required")
        .min(8, "Password must have more than 8 characters")
        .max(50, "Password must have less than 50 characters"),
    confirmPassword: z.string().min(1, "Password confirmation is required"),
}).refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
});

export const signInFormSchema = z.object({
    email: z.string().email("Invalid email").min(8, "Email is required"),
    password: z
        .string()
        .min(1, "Password is required")
        .min(8, "Password must have more than 8 characters")
        .max(50, "Password must have less than 50 characters"),
});
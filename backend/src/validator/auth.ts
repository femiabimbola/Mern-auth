import { z } from "zod";

export const emailSchema = z.string().trim().email().min(1).max(255).nonempty("email cannot be empty");
export const passwordSchema = z.string().trim().min(6,"Password must be at least 6 characters long.").max(45).nonempty("Password is needed");
export const verificationCodeSchema = z.string().trim().min(1).max(25);

export const registerSchema = z
  .object({
    name: z.string().trim().min(1).max(255).nonempty("name is required"),
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: passwordSchema,
  })
  .refine((val) => val.password === val.confirmPassword, {
    message: "Password does not match",
    path: ["confirmPassword"],
  });

  export const loginSchema = z.object({
    email: emailSchema,
    password: passwordSchema,
    userAgent: z.string().optional(),
  });
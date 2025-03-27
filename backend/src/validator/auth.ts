import { z } from "zod";

export const emailSchema = z.string().trim().email().min(1).max(255).nonempty("email cannot be empty");
export const passwordSchema = z.string().trim().min(6).max(255).nonempty("Password is needed");
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
import { z } from "zod";

const passwordChecker = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[^a-zA-Z0-9]/, "Password must have at least one non-alphanumeric character")
  .refine(
    (password) => {
      return /[A-Z]/.test(password) && /[^a-zA-Z0-9]/.test(password) && password.length >= 8;
    },
    {
      message:
        "Password must be at least 8 characters long, contain one uppercase letter, and one non-alphanumeric character",
    }
  );

export const registerSchema = z.object({
  email: z.string().email("Invalid email address"),
  userName: z.string().min(4, "Username must be at least 3 characters"),
  password: passwordChecker,
});

export const loginSchema = z.object({
  userIdentifier: z.string().min(4, "Email or username is required"),
  password: passwordChecker,
});

export const resetPasswordSchema = z.object({
  email: z.string().email("Invalid email address"),
});

export const passwordResetSchema = z
  .object({
    password: passwordChecker,
    confirmPassword: passwordChecker,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });


export type PasswordResetInput = z.infer<typeof passwordResetSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type resetPassword = z.infer<typeof resetPasswordSchema>;

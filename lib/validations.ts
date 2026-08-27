import { z } from "zod";

export const userRegistrationSchema = z.object({
  email: z.string().email("Invalid email address"),
  username: z.string()
    .min(2, "Username must be at least 2 characters")
    .max(8, "Username must be at most 8 characters")
    .regex(/^[A-Za-z0-9_]+$/, "Only letters, numbers, and underscores allowed"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

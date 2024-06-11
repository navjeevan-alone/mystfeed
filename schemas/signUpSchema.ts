import { z } from "zod";

// Regular expression to allow only alphanumeric characters and underscores
const usernameRegex = /^[a-zA-Z0-9_]+$/;

// Zod schema for username validation
const usernameSchema = z
  .string()
  .min(3, { message: "Username must be at least 3 characters long" })
  .max(20, { message: "Username must be at most 20 characters long" })
  .regex(usernameRegex, {
    message: "Username can only contain letters, numbers, and underscores",
  });

const passwordSchema = z
  .string()
  .min(6, { message: "Password must be at least 6 characters long" })
  .max(20, { message: "Password must be at most 20 characters long" })
  .regex(/[a-z]/, {
    message: "Password must contain at least one lowercase letter",
  })
  .regex(/[A-Z]/, {
    message: "Password must contain at least one uppercase letter",
  })
  .regex(/[^a-zA-Z0-9]/, {
    message: "Password must contain at least one special character",
  });

// Email validation schema
const emailSchema = z.string().email({ message: "Invalid email address" });

// Signup schema combining username, password, and email
export const signUpSchema = z.object({
  username: usernameSchema,
  password: passwordSchema,
  email: emailSchema,
});

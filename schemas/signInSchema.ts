import { z } from "zod";

// Verification code validation schema
export const signInSchema = z.object({
  idenfier: z.string(),
  password: z.string(),
});

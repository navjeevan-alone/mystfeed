import { z } from "zod";

// Verification code validation schema
export const verifySchema = z
  .string()
  .length(6, { message: "Code must be exactly 6 characters long" })
  .regex(/^\d{6}$/, { message: "Code must contain only numbers" });

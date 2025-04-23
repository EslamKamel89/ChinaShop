import { z } from "zod";

export const authSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().min(1).max(255).default("").optional(),
});
export type AuthForm = z.infer<typeof authSchema>;

export const categorySchema = z.object({
  name: z.string().min(1).max(255),
});
export type CategoryForm = z.infer<typeof categorySchema>;

export const ColorSchema = z.object({
  name: z.string().min(1).max(255),
});
export type ColorForm = z.infer<typeof ColorSchema>;

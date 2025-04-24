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

export const colorSchema = z.object({
  name: z
    .string()
    .min(1, { message: "color is required" })
    .max(255, { message: "Color can't exceed 255 chars" }),
  value: z
    .string()
    .min(1, { message: "color value is required" })
    .max(10, { message: "Color value can't exceed 10 chars" }),
  // .default("#000000"),
});
export type ColorForm = z.infer<typeof colorSchema>;

export const sizeSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Size name is required" })
    .max(255, { message: "Size name can't exceed 255 chars" }),
  value: z
    .string()
    .min(1, { message: "Size Value value is required" })
    .max(10, { message: "Size value can't exceed 20 chars" }),
  // .default("#000000"),
});
export type SizeForm = z.infer<typeof sizeSchema>;

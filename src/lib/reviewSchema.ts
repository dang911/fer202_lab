import { z } from "zod";

export const reviewSchema = z.object({
  product_id: z.number({ message: "Product ID is required" }).int().positive(),
  rating: z
    .number({ message: "Please select a rating" })
    .int("Rating must be an integer")
    .min(1, "Rating must be between 1 and 5")
    .max(5, "Rating must be between 1 and 5"),
  comment: z
    .string()
    .trim()
    .min(1, "Comment must be between 1 and 500 characters")
    .max(500, "Comment must be between 1 and 500 characters"),
});

export type ReviewFormData = z.infer<typeof reviewSchema>;

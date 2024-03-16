import { z } from "zod"

export const serviceSchema = z.object({
  name: z.string(),
  estimatedPrice: z.string().min(1, "Mangler pris"),
  imageUrl: z.string().url("Forkert url format").optional(),
  estimatedTime: z.string().min(1, "Mangler tid"),
})

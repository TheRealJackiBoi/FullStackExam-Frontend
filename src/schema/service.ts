import { z } from "zod"

export const serviceSchema = z.object({
  email: z.string().email("Forkert email format"),
  password: z.string().min(8, "Kodeord skal være mindst 8 tegn"),
})
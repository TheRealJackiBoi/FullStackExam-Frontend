import { z } from "zod";

export const companyDescriptionSchema = z.object({
  description: z.string().min(5, "Beskrivelsen skal være mindst 5 tegn")
})
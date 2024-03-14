import { z } from "zod"

export const userCreationSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(50),
  user: z.object({
    firstName: z.string().min(3).max(50),
    lastName: z.string().min(3).max(50),
    zipCode: z.string().length(5),
    role: z.enum(["USER", "ADMIN"]),
    street: z.string().min(3).max(50),
    city: z.string().min(3).max(50),
  }),
})

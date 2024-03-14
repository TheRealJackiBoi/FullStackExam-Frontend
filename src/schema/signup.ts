import { z } from "zod"

export const userCreationSchema = z.object({
  email: z.string().email("Forkert email format"),
  password: z.string().min(8, "Mindst 8 karatere").max(50, "maks 50 karakter"),
  user: z.object({
    firstName: z.string().min(3, "Mindst 3 karatere").max(50, "maks 50 karakter"),
    lastName: z.string().min(3, "Mindst 3 karatere").max(50, "maks 50 karakter"),
    role: z.string(),
    street: z.string().min(3, "Mindst 3 karatere").max(50, "maks 50 karakter"),
    houseNumber: z.string(),
    zipCode: z.string(),
  }),
})

import { z } from "zod"

export const bookingSchema = z.object({
    enhed: z.string().min(1, "Der skal være en enhed")
})
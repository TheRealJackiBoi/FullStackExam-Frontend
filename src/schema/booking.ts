import { z } from "zod"

export const bookingSchema = z.object({
    enhed: z.string().min(1, "Der skal være en enhed"),
    date: z.date({ required_error: "Vi skal bruge en dato"})
})
import { z } from "zod"

export const bookingSchema = z.object({
    enhed: z.string().min(1, "Der skal være en enhedns type"),
    model: z.string().min(1, "Indtast venligst model"),
    brand: z.string().min(1, "Vi vil gerne have mærke"),
    date: z.date({ required_error: "Vi skal bruge en dato"})
})
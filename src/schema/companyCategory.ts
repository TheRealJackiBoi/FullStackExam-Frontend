import { z } from "zod"
import { CategoryEnum } from "@/types/categoryEnum"

export const companyCategoriesSchema = z.object({
  categories: z.array(z.nativeEnum(CategoryEnum)),
})

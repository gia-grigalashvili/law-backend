import { z } from "zod"
export const PartnersSchema = z.object({
  title: z.string().min(1),
  subtitle: z.string().min(1),
  image: z.string().url(),
})

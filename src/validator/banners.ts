import { z } from "zod"
export const bunerSchema = z.object({
  title: z.string().min(1),
  subtitle: z.string().optional(),
  image: z.string().url(),
  link1: z.string().url().optional(),
})

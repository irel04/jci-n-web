import { z } from "zod"

export const ZLogin = z.object({
	email: z.string().trim().email("Enter a valid email"),
	password: z.string()
})
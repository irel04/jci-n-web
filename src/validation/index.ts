import { z } from "zod"

export const ZLogin = z.object({
	email: z.string().trim().email("Enter a valid email"),
	password: z.string()
})


export const ZProfile = z.object({
	first_name: z.string().nonempty(),
	last_name: z.string().nonempty(),
	birthdate: z.string().nonempty(),
	phone_number: z.string().nonempty(),
	address: z.string().nonempty(),
	email_address: z.string().email().nonempty(),
	password: z.string().nonempty()
})
import { z } from "zod"

export const ZLogin = z.object({
	email: z.string().trim().email("Enter a valid email"),
	password: z.string()
})


export const ZProfile = z.object({
	first_name: z.string().nonempty("Field required"),
	last_name: z.string().nonempty("Field required"),
	birthdate: z.string().nonempty("Field required"),
	phone_number: z.string().nonempty("Field required"),
	address: z.string().nonempty("Field required"),
	email_address: z.string().email().nonempty("Field required"),
	password: z.string()
		.optional() // Allows the field to be empty (not required)
		.or(z.literal("")) // Treats an empty string as valid
		.refine((value) => !value || value.length >= 6, {
			message: "Minimum of 6 characters",
		})

})
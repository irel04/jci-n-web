import { z } from "zod"

const NON_EMPTY_MESSAGE = "Field required"

const ZLogin = z.object({
	email: z.string().trim().email("Enter a valid email"),
	password: z.string()
})


const ZProfile = z.object({
	first_name: z.string().nonempty(NON_EMPTY_MESSAGE),
	last_name: z.string().nonempty(NON_EMPTY_MESSAGE),
	birthdate: z.string().nonempty(NON_EMPTY_MESSAGE),
	phone_number: z.string().nonempty(NON_EMPTY_MESSAGE),
	address: z.string().nonempty(NON_EMPTY_MESSAGE),
	email_address: z.string().email().nonempty(NON_EMPTY_MESSAGE),
	password: z.string()
		.optional() // Allows the field to be empty (not required)
		.or(z.literal("")) // Treats an empty string as valid
		.refine((value) => !value || value.length >= 6, {
			message: "Minimum of 6 characters",
		})

})

const ZUserEditProfile = z.object({
	first_name: z.string().nonempty(NON_EMPTY_MESSAGE),
	last_name: z.string().nonempty(NON_EMPTY_MESSAGE),
	birthdate: z.string().nonempty(NON_EMPTY_MESSAGE),
	phone_number: z.string().nonempty(NON_EMPTY_MESSAGE),
	address: z.string().nonempty(NON_EMPTY_MESSAGE),
	email_address: z.string().email().nonempty(NON_EMPTY_MESSAGE),
	status: z.string().nonempty(NON_EMPTY_MESSAGE),
	RFID: z.string().nonempty(NON_EMPTY_MESSAGE),
})


const ZSendUsEmail = z.object({
	title: z.string().nonempty(NON_EMPTY_MESSAGE),
	email: z.string().email().nonempty(NON_EMPTY_MESSAGE),
	message: z.string().nonempty(NON_EMPTY_MESSAGE),

})

export {
	ZLogin,
	ZProfile,
	ZUserEditProfile,
	ZSendUsEmail
}
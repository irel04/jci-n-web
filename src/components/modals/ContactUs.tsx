import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ZSendUsEmail } from "@/validation"
import { zodResolver } from "@hookform/resolvers/zod"
import { DialogDescription } from "@radix-ui/react-dialog"
import { SendHorizontal } from "lucide-react"
import { useForm } from "react-hook-form"
import emailjs from '@emailjs/browser';
import { toast } from "react-toastify"

type Props = {
	isOpen: boolean,
	onClose: () => void
}

type TEmail = {
	email: string,
	message: string,
	name: string,
	title: string
}

const ContactUs = ({ isOpen, onClose }: Props) => {



	const { register, reset, handleSubmit, formState: { errors } } = useForm({
		resolver: zodResolver(ZSendUsEmail),
		mode: "onChange"
	})

	const handleSendUsEmail = (value: TEmail) => {
		emailjs
			.send(import.meta.env.VITE_SERVICE_ID, import.meta.env.VITE_TEMPLATE_ID, value , {
				publicKey: import.meta.env.VITE_PUBLIC_KEY,
			})
			.then(
				() => {
					toast.success("Message Sent!")
					reset()
					onClose()
				},
				(error) => {
					console.error(error);
					toast.error("Failed sending message! Please try again.")
				},
			);
		
	}


	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className="text-neutral-500">
				<DialogHeader>
					<DialogTitle className="text-brand-700">Send Us Message</DialogTitle>
					<DialogDescription className="text-neutral-500">Please fill out the form below and we will get back to you as soon as possible.</DialogDescription>
				</DialogHeader>
				<form className="grid gap-2 lg:gap-4 py-4" onSubmit={handleSubmit(handleSendUsEmail)}>
					<div className="flex flex-col gap-2">
						<Label htmlFor="email">Email</Label>
						<Input {...register("email")} className={`${errors.email ? "border-red-500 border-[1.2px]" : ""}`}/>
					</div>
					<div className="flex flex-col gap-2">
						<Label htmlFor="Name">Name</Label>
						<Input  {...register("name")} className={`${errors.name ? "border-red-500 border-[1.2px]" : ""}`}/>
					</div>
					<div className="flex flex-col gap-2">
						<Label htmlFor="title">Title</Label>
						<Input {...register("title")} className={`${errors.title ? "border-red-500 border-[1.2px]" : ""}`}/>
					</div>
					<div className="flex flex-col gap-2">
						<Label htmlFor="message">Message</Label>
						<Textarea {...register("message")} className={`h-18 md:h-24 ${errors.message ? "border-red-500 border-[1.2px]" : ""}`}/>
					</div>
					<DialogFooter>
						<Button type="submit">
							<span>Send</span>
							<SendHorizontal />
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	)
}

export default ContactUs
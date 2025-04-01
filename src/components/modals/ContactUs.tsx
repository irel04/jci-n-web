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

type Props = {
	isOpen: boolean,
	onClose: () => void
}

type TEmail = {
	email: string,
	message: string,
	title: string
}

const ContactUs = ({ isOpen, onClose }: Props) => {


	const { register, handleSubmit, formState: { errors } } = useForm({
		resolver: zodResolver(ZSendUsEmail),
		mode: "onChange"
	})

	const handleSendUsEmail = (value: TEmail) => {
		console.log(value)
	}


	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className="text-neutral-500">
				<DialogHeader>
					<DialogTitle className="text-brand-700">Send Us Message</DialogTitle>
					<DialogDescription className="text-neutral-500">Please fill out the form below and we will get back to you as soon as possible.</DialogDescription>
				</DialogHeader>
				<form className="grid gap-4 py-4" onSubmit={handleSubmit(handleSendUsEmail)}>
					<div className="flex flex-col gap-2">
						<Label htmlFor="email">Email</Label>
						<Input {...register("email")} className={`${errors.email ? "border-red-500 border-[1.2px]" : ""}`}/>
					</div>
					<div className="flex flex-col gap-2">
						<Label htmlFor="title">Title</Label>
						<Input  {...register("title")} className={`${errors.title ? "border-red-500 border-[1.2px]" : ""}`}/>
					</div>
					<div className="flex flex-col gap-2">
						<Label htmlFor="username">Message</Label>
						<Textarea {...register("message")} className={`h-32 ${errors.message ? "border-red-500 border-[1.2px]" : ""}`}/>
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
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { DialogDescription } from "@radix-ui/react-dialog"
import { SendHorizontal } from "lucide-react"

type Props = {
	isOpen: boolean,
	onClose: () => void
}

const ContactUs = ({ isOpen, onClose }: Props) => {
	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className="text-neutral-500">
				<DialogHeader>
					<DialogTitle className="text-brand-700">Send Us Message</DialogTitle>
					<DialogDescription className="text-neutral-500">Please fill out the form below and we will get back to you as soon as possible.</DialogDescription>
				</DialogHeader>
				<form className="grid gap-4 py-4">
					<div className="flex flex-col gap-2">
						<Label htmlFor="email">Email</Label>
						<Input/>
					</div>
					<div className="flex flex-col gap-2">
						<Label htmlFor="title">Title</Label>
						<Input  />
					</div>
					<div className="flex flex-col gap-2">
						<Label htmlFor="username">Message</Label>
						<Textarea className="h-32"/>
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
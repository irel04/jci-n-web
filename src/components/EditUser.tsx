import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { TCompleteProfile } from "@/types"
import { ZUserEditProfile } from "@/validation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect } from "react"
import { useForm } from "react-hook-form"

type Props = {
	isOpen: boolean,
	onClose: () => void
}

const EditUser = ({ isOpen, onClose }: Props) => {

	const { register, handleSubmit, formState: { errors, isValid } } = useForm({
		resolver: zodResolver(ZUserEditProfile),
		mode: "onChange"
	})

	const handleSave = async (value: TCompleteProfile) => {
		console.log(value)
	}

	

	return (
		<Dialog open={isOpen} onOpenChange={onClose} >
			<DialogContent className="text-neutral-700 h-96 md:h-[450px] lg:h-[600px] overflow-hidden">
				<DialogHeader>
					<DialogTitle>Edit User</DialogTitle>
					<DialogDescription>Make changes to the user. Click save when you're done</DialogDescription>
				</DialogHeader>
				<form className="grid gap-4 py-4 px-2 overflow-y-auto rounded-md" onSubmit={handleSubmit(handleSave)}>
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="name">Last Name</Label>
						<Input className={`col-span-3 ${errors.last_name ? "border-red-500 border-[1.2px]" : ""}`} {...register("last_name")} />
					</div>
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="username" >First Name</Label>
						<Input className={`col-span-3 ${errors.first_name ? "border-red-500 border-[1.2px]" : ""}`}  {...register("first_name")}/>
					</div>
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="username" >Birthday</Label>
						<Input className={`col-span-3 ${errors.birthdate ? "border-red-500 border-[1.2px]" : ""}`} {...register("birthdate")}/>
					</div>
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="username" >Email</Label>
						<Input className={`col-span-3 ${errors.email_address ? "border-red-500 border-[1.2px]" : ""}`} {...register("email_address")}/>
					</div>
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="username" >Address</Label>
						<Input className={`col-span-3 ${errors.address ? "border-red-500 border-[1.2px]" : ""}`}  {...register("address")} />
					</div>
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="username">Mobile No.</Label>
						<Input className={`col-span-3 ${errors.phone_number ? "border-red-500 border-[1.2px]" : ""}`}   {...register("phone_number")}/>
					</div>
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="username" >RFID</Label>
						<Input className={`col-span-3 ${errors.RFID ? "border-red-500 border-[1.2px]" : ""}`} {...register("RFID")} />
					</div>
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="username" >Status</Label>
						<Input className={`col-span-3 ${errors.status ? "border-red-500 border-[1.2px]" : ""}`}  {...register("status")}/>
					</div>
					<DialogFooter>
						<Button type="submit" variant={!isValid ? "ghost" : "default"} disabled={!isValid}>Save changes</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	)
}

export default EditUser
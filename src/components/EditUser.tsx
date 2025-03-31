import InputCalendar from "@/components/InputCalendar"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { TCompleteProfile } from "@/types"
import supabase from "@/utils/supabase"
import { ZUserEditProfile } from "@/validation"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { toast } from "react-toastify"

type Props = {
	isOpen: boolean,
	onClose: () => void,
	userData: TCompleteProfile,
}

const EditUser = ({ isOpen, onClose, userData }: Props) => {



	const { control, register, handleSubmit, formState: { errors, isValid } } = useForm({
		resolver: zodResolver(ZUserEditProfile),
		mode: "onChange",
		defaultValues: {
			last_name: userData.last_name,
			first_name: userData.first_name,
			address: userData.address,
			birthdate: userData.birthdate,
			email_address: userData.email_address,
			phone_number: userData.phone_number || "",
			RFID: userData.RFID || "",
			status: userData.status || ""
		}
	})



	const handleSave = async (value: TCompleteProfile) => {
		console.log(value, userData.id)
		try {
			const { error } = await supabase.from("users_details").update(value).eq("id", userData.id)

			if(error) throw error

			toast.success("Update Successfully")
			onClose()

		} catch (error) {
			console.error(error)
			toast.error("Update failed...")
		}
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
						<Input className={`col-span-3 ${errors.first_name ? "border-red-500 border-[1.2px]" : ""}`}  {...register("first_name")} />
					</div>
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="username" >Birthday</Label>
						<Controller control={control} name="birthdate" render={({ field: { value, onChange } }) => (
							<div className="col-span-3">
								<InputCalendar variant="shadcn" defaultValue={value} onChange={onChange} error={errors.birthdate}/>
							</div>
						)}/>
					</div>
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="username" >Email</Label>
						<Input className={`col-span-3 ${errors.email_address ? "border-red-500 border-[1.2px]" : ""}`} {...register("email_address")} />
					</div>
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="username" >Address</Label>
						<Input className={`col-span-3 ${errors.address ? "border-red-500 border-[1.2px]" : ""}`}  {...register("address")} />
					</div>
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="username">Mobile No.</Label>
						<Input className={`col-span-3 ${errors.phone_number ? "border-red-500 border-[1.2px]" : ""}`}   {...register("phone_number")} />
					</div>
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="username" >RFID</Label>
						<Input className={`col-span-3 ${errors.RFID ? "border-red-500 border-[1.2px]" : ""}`} {...register("RFID")} />
					</div>
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="username" >Status</Label>
						<Controller control={control} name="status" render={({ field: { onChange, value } }) => (
							<DropdownMenu>
								<DropdownMenuTrigger className="col-span-3">
									<p className={cn("file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
										"aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive")}>{value}</p>
								</DropdownMenuTrigger>
								<DropdownMenuContent className="w-56 md:w-72 lg:w-80">
									<DropdownMenuItem onSelect={() => onChange("onboarding")}>onboarding</DropdownMenuItem>
									<DropdownMenuItem onSelect={() => onChange("active")}>active</DropdownMenuItem>
									<DropdownMenuItem onSelect={() => onChange("inactive")}>inactive</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						)} />
					</div>
					<DialogFooter>
						<Button type="submit" variant={!isValid ? "ghost" : "default"} size="sm" disabled={!isValid}>Save changes</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	)
}

export default EditUser
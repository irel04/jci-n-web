import pupLogo from "@/assets/pup-logo.png"
import { useAuth } from "@/auth/auth.module"
import Input from "@/components/Input"
import { TLogin } from "@/types"
import { ZLogin } from "@/validation"
import { zodResolver } from "@hookform/resolvers/zod"
import { X } from "lucide-react"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"




type Props = {
	isOpen: boolean,
	handleClose?: () => void;
	showCloseButton?: boolean,
}

const Login = ({ isOpen, handleClose, showCloseButton = true }: Props) => {

	const [isLoading, setIsLoading] = useState<boolean>(false)

	const { handleSubmit, register, formState: { errors }, setError } = useForm<TLogin>({
		resolver: zodResolver(ZLogin),
		mode: "onChange"
	})

	const { login } = useAuth()
	


	const handleLogin = async (value: TLogin) => {
		setIsLoading(true)
		try {
			await login(value)
			toast.success("Login successfully", {onClose: () => window.location.href = "/admin"})

		} catch (error) {

			console.error('Unexpected error:', error);

			setError("email", { message: "Invalid password" })
			setError("password", { message: "Invalid password" })

			toast.error("Invalid email/password")

		} finally {
			setIsLoading(false)
		}

	}

	useEffect(() => {
		if (isOpen) {
			document.body.classList.add("overflow-hidden")
		} else {
			document.body.classList.remove("overflow-hidden")
		}

		return () => {
			document.body.classList.remove("overflow-hidden")

		}
	}, [isOpen])

	return (
		<div className={`${isOpen ? "fixed" : "hidden"}  inset-0 z-20 bg-black/80 p-4 md:p-8 overflow-auto flex items-center justify-center`}>
			<div className="relative w-full max-w-[320px] md:max-w-[500px] shadow-lg flex flex-col items-center text-brand-700 gap-5 rounded-md p-8 mx-auto bg-app-white space-y-2">
				<button className={`top-5 right-5 ${showCloseButton && handleClose ? "absolute" : "hidden"}`} onClick={handleClose}>
					<X />
				</button>
				<img src={pupLogo} alt="" />
				<h5 className="text-xl font-bold">Login as Admin</h5>
				<form className="flex-1 justify-center items-center flex flex-col gap-4" onSubmit={handleSubmit(handleLogin)}>
					<Input label="Email" {...register("email")} error={errors["email"]} showErrorMessage={false} />
					<Input type="password" label="Password" {...register("password")} error={errors["password"]} showErrorMessage={false} />
					<button className="cursor-pointer px-4 py-2 bg-brand-300 rounded-md text-app-white max-w-max mx-auto text-sm md:text-base" type="submit">{isLoading ? "Please wait..." : "Continue"}</button>
				</form>
			</div>
		</div>
	)
}

export default Login
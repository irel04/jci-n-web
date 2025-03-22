import Input from "@src/components/ui/Input"
import pupLogo from "@src/assets/pup-logo.png"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { ZLogin } from "@src/validation"
import { TLogin } from "@src/types"
import { useEffect, useState } from "react"
import { X } from "lucide-react"
import { useAuth } from "@src/context/auth/auth.module"




 type Props =  {
	isOpen: boolean,
	handleClose?: () => void;
	showCloseButton?: boolean,
 }

const Login = ({isOpen, handleClose, showCloseButton=true}: Props) => {

	const [isLoading, setIsLoading] = useState<boolean>(false)

	const { handleSubmit, register, formState: { errors } } = useForm<TLogin>({
		resolver: zodResolver(ZLogin),
		mode: "onChange"
	})

	const { login } = useAuth()

	

	const handleLogin = async (value: TLogin) => {
		setIsLoading(true)
		await login(value, window.location.pathname)

		setIsLoading(false)
	}

	useEffect(() => {
		if(isOpen){
			document.body.classList.add("overflow-hidden")
		} else {
			document.body.classList.remove("overflow-hidden")
		}

		return () => {
			document.body.classList.remove("overflow-hidden")

		}
	}, [isOpen])

	return (
		<div className={`${isOpen? "fixed" : "hidden" }  inset-0 z-20 bg-black/80 p-4 md:p-8 overflow-auto`}>
			<div className="relative w-full max-w-[320px] md:max-w-[500px] shadow-lg flex flex-col items-center text-brand-700 gap-5 rounded-md p-8 mx-auto bg-app-white space-y-2 h-full">
				<button className={`top-5 right-5 ${showCloseButton && handleClose ? "absolute": "hidden"}`} onClick={handleClose}>
					<X />
				</button>
				<img src={pupLogo} alt="" />
				<p className="text-xl font-bold">Login</p>
				<form className="flex-1 justify-center items-center flex flex-col gap-4" onSubmit={handleSubmit(handleLogin)}>
					<Input label="Email" {...register("email")} error={errors["email"]} />
					<Input type="password" label="Password" {...register("password")} error={errors["password"]}/>
					<button className="cursor-pointer px-4 py-2 bg-brand-300 rounded-md text-app-white max-w-max mx-auto text-sm md:text-base" type="submit">{isLoading ? "Please wait..." : "Continue"}</button>
				</form>
			</div>
		</div>
	)
}

export default Login
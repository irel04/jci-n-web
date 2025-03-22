import Input from "@src/components/ui/Input"
import pupLogo from "@src/assets/pup-logo.png"

const Login = () => {

		

	return (
		<div className="fixed inset-0 z-20 bg-black/80 p-4 md:p-8">
			<div className="w-full max-w-[320px] md:max-w-[500px] shadow-lg flex flex-col items-center text-brand-700 gap-5 rounded-md p-8 mx-auto bg-app-white space-y-2 h-full ">
				<img src={pupLogo} alt="" className="" />
				<p className="text-xl font-bold">Login</p>
				<form className="flex-1 justify-center items-center flex flex-col gap-4">
					<Input label="Email" />
					<Input type="password" label="Password" />
					<button className="px-4 py-2 bg-brand-300 rounded-md text-app-white max-w-max mx-auto text-sm md:text-base" type="submit">Continue</button>
				</form>
			</div>
		</div>
	)
}

export default Login
import Input from "@src/components/ui/Input"

const Login = () => {
	return (
		<div className="w-full max-w-[320px] md:max-w-[500px] shadow-lg mx-auto p-4 flex flex-col justify-center items-center text-brand-700 gap-5 rounded-md bg-neutral-200/50 h-full max-h-[300px]">
			<p className="text-lg font-bold md:text-xl">Login</p>

			<form className="flex flex-col gap-4">
				<Input placeholder="Email"/>
				<Input placeholder="Password" type="password"/>
				<button className="px-4 py-2 bg-brand-300 rounded-md text-app-white max-w-max mx-auto text-sm md:text-base" type="submit">Continue</button>
			</form>
		</div>
	)
}

export default Login

import { InputHTMLAttributes } from "react"
import { FieldError } from "react-hook-form"

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
	label: string, 
	icon?: string,
	error?: FieldError,
	showErrorMessage?: boolean 
}

const Input = ({ error, icon, label, showErrorMessage=true, ...props }: InputProps) => {

	
	return (
		<div className="flex flex-col max-w-60 text-neutral-600 gap-1 text-sm md:text-base h-20">
			<label className="text-neutral-600">{label}</label>
			<div className={`border-neutral-400 border-[1px] rounded-md p-2 ${error ? "border-red-500": ""}`}>
				<input className="focus:outline-none w-full bg-none" {...props}/>
				{icon && <img src={icon} alt="" />}
			</div>
			{error && showErrorMessage && <p className="text-xs text-red-500 md:text-base">{error.message}</p>}
			{/* <p className="text-xs text-red-500 md:text-base">Error</p> */}
		</div>
	)
}

export default Input
import { InputHTMLAttributes } from "react"

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
	label: string, 
	icon?: string 
}

const Input = ({ icon, label, ...props }: InputProps) => {
	return (
		<div className="flex flex-col max-w-48 text-neutral-400 gap-1 text-sm md:text-base">
			<label htmlFor={label} className="text-neutral-600">{label}</label>
			<div className="border-neutral-400 border-[1px] rounded-md p-2">
				<input id={label.toLowerCase()} {...props} className="focus:outline-none w-full" />
				{icon && <img src={icon} alt="" />}
			</div>
		</div>
	)
}

export default Input
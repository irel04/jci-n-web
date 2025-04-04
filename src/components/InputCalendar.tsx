import { useMask } from "@react-input/mask";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import Calendar from "react-calendar";
import { FieldError } from "react-hook-form";
import 'react-calendar/dist/Calendar.css';
import { Value } from "react-calendar/src/shared/types.js";
import { format } from "date-fns/fp";
import { cn } from "@/lib/utils";

type Props = {
	label?: string;
	error?: FieldError;
	onChange?: (value: string) => void,
	defaultValue?: string,
	variant?: "default" | "shadcn"

};

const InputCalendar = ({ defaultValue, onChange, label, error, variant = "default" }: Props) => {
	const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(false);
	const inputRef = useMask({
		mask: '____-__-__',
		replacement: { _: /\d/ },
	});

	const [date, setDate] = useState<string>("")

	// Ref for detecting outside clicks
	const calendarRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		// Function to close calendar when clicking outside
		const handleClickOutside = (event: MouseEvent) => {
			if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
				setIsCalendarOpen(false);
			}
		};

		// Add event listener
		document.addEventListener("mousedown", handleClickOutside);

		// Cleanup event listener on unmount
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
		setDate(e.target.value)
	}

	const handleClickDate = (value: Value) => {
		const formatDate = value ? format("yyyy-MM-dd", value.toString()) : ""

		setDate(formatDate)
		setIsCalendarOpen(false)
	}


	useEffect(() => {

		if (onChange) {
			onChange(date)
		}

	}, [date, onChange])

	useEffect(() => {
		if (defaultValue !== "") {
			setDate(defaultValue || "")
		}
	}, [defaultValue])




	return (
		<div className={`relative ${variant==="default" ? " flex flex-col max-w-60 text-neutral-600 gap-1 text-sm md:text-base h-20" : "w-full"}`} ref={calendarRef}>
			{variant === "default" && <label className="text-neutral-600">{label}</label>}
			<div className={variant === "default" ? `border-neutral-400 border-[1px] rounded-md p-2 ${error ? "border-red-500" : ""}` : cn(`file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
				"aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive ${error ? "border-red-500" : ""}`)}>
				<input
					className="focus:outline-none w-full bg-none"
					value={date}
					onChange={handleChangeInput}
					ref={inputRef}
					placeholder="YYYY-MM-DD"
					onClick={() => setIsCalendarOpen(true)}
				/>
			</div>
			{error && variant==="default" && <p className="text-xs text-red-500 md:text-base">{error.message}</p>}

			{/* Calendar Container */}
			<div
				className={`z-10 ${variant === "default" ? "top-18" : "top-10"} absolute transition-transform duration-200 ease-out ${isCalendarOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
					} max-w-[320px]`}
			>
				<Calendar onChange={handleClickDate} />
			</div>
		</div>
	);
};

export default InputCalendar;

import supabase from "@src/utils/supabase"
import { useState } from "react"

type TResult = {
	id: string,
	is_success: boolean,
	time_completed: number,
	prediction: string,
	created_at: string
}

const EmbeddedSystem = () => {
	const [result, setResult] = useState<TResult | null>()
	const [isLoading, setIsLoading] = useState<boolean>(true)

	const fetchLatest = async () => {
		try {
			const {data, error} = await supabase.from("embedded_system").select("*")

			if(error) throw error
		} catch (error) {
			console.error(error)
		}
	}

	return (
		<div className="w-full h-screen flex flex-col justify-center items-center">
			<div className="border-neutral-300 border-2 min-w-xs max-w-xs lg:min-w-xl min-h-52 md:min-h-80  flex flex-col rounded-md pb-4 px-2 pt-2 gap-4">
				<h1 className="text-base font-bold text-brand-700 border-b-2 border-neutral-300 w-full text-center md:text-lg lg:text-xl">Emotion Detection Challenge</h1>
				{/* Information */}
				<div className="w-full flex-1 space-y-1 p-2 border-b-2 border-neutral-300">
					<p className="text-sm md:text-base"><span className="text-lg font-bold lg:text-xl">Hi Kian 💗</span> Thank you for participating in our exhibit. Here's the summary of the activity</p>

					<p className="text-sm md:text-base mt-4">🧩 Remarks: <span className="font-semibold">Passed (Claimed your prize inside the box)</span></p>
					<p className="text-sm md:text-base">⏰ Time Elapse: <span  className="font-semibold">4.32 s</span></p>
				</div>
				<div className="flex flex-col gap-2">
					<p className="text-lg md:text-xl font-semibold">📢 Your emotional tendency in the next few hours:</p>
					<p className="ml-4">A wave of nostalgia might hit you. Keep some good music ready! 🎶</p>
				</div>
			</div>
		</div>
	)
}

export default EmbeddedSystem
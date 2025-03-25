import supabase from "@src/utils/supabase"
import { useEffect, useState } from "react"

type TResult = {
	id: string,
	nickname: string,
	is_success: boolean,
	time_completed: number,
	prediction: string,
	created_at: string
}

const EmbeddedSystem = () => {
	const [result, setResult] = useState<TResult | null>(null)
	const [isLoading, setIsLoading] = useState<boolean>(false)

	const fetchLatest = async () => {
		setIsLoading(true)
		try {
			const { data, error } = await supabase.from("embedded_system").select("*").order("created_at", { ascending: false }).limit(1)


			if(error) throw error

			setResult(data[0])

		} catch (error) {
			console.error(error)
		} finally {
			setIsLoading(false)
		}
	}

	useEffect(() => {
		fetchLatest()
	}, [])

	useEffect(() => {

		const channels = supabase.channel('custom-all-channel')
			.on(
				'postgres_changes',
				{ event: '*', schema: 'public', table: 'embedded_system' },
				() => {
					fetchLatest()
				}
			).subscribe()

		return () => {
			channels.unsubscribe()
		}
	}, [])

	if (!result || isLoading) {
		return <div className="w-full h-screen flex flex-col justify-center items-center">
			<div className="border-neutral-300 border-2 min-w-xs max-w-xs lg:min-w-xl min-h-52 md:min-h-80 flex flex-col rounded-md pb-4 px-2 pt-2 gap-4 animate-pulse">
				<div className="h-6 w-3/4 bg-neutral-300 rounded-md mx-auto"></div>

				{/* Information */}
				<div className="w-full flex-1 space-y-3 p-2 border-b-2 border-neutral-300">
					<div className="h-5 w-2/3 bg-neutral-300 rounded-md"></div>
					<div className="h-4 w-1/2 bg-neutral-300 rounded-md"></div>
					<div className="h-4 w-1/4 bg-neutral-300 rounded-md"></div>
				</div>

				<div className="flex flex-col gap-2">
					<div className="h-5 w-3/4 bg-neutral-300 rounded-md"></div>
					<div className="h-4 w-2/3 bg-neutral-300 rounded-md ml-4"></div>
				</div>
			</div>
		</div>

	}

	return (
		<div className="w-full h-screen flex flex-col justify-center items-center">
			<div className="border-brand-300 border-2 min-w-xs max-w-xs lg:min-w-xl min-h-52 md:min-h-80  flex flex-col rounded-md pb-4 px-2 pt-2 gap-4">
				<h1 className="text-base font-bold text-brand-700 border-b-2 border-neutral-300 w-full text-center md:text-lg lg:text-xl">Emotion Detection Challenge</h1>
				{/* Information */}
				<div className="w-full flex-1 space-y-1 p-2 border-b-2 border-neutral-300">
					<p className="text-sm md:text-base"><span className="text-lg font-bold lg:text-xl">Hi {result.nickname} 💗</span> Thank you for participating in our exhibit. Here's the summary of the activity</p>

					<p className="text-sm md:text-base mt-4">🧩 Remarks: <span className="font-semibold">{result.is_success ? "Passed" : "Failed"} (Claimed your prize inside the box)</span></p>
					<p className="text-sm md:text-base">⏰ Time Elapse: <span  className="font-semibold">{result.time_completed} s</span></p>
				</div>
				<div className="flex flex-col gap-2">
					<p className="text-lg md:text-xl font-semibold">📢 Your emotional tendency in the next few hours:</p>
					<p className="ml-4">{result.prediction}</p>
				</div>
			</div>
		</div>
	)
}

export default EmbeddedSystem
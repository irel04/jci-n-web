import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import React, { useEffect, useState } from "react"
import features from "@/data/features.json"
import dashboard from "@/assets/screenshots/Dashboard.png"
import locking from "@/assets/screenshots/Locking.png"
import notification from "@/assets/screenshots/Notification.png"
import routing from "@/assets/screenshots/Route.png"
import reports from "@/assets/screenshots/Reports.png"
import supabase from "@/utils/supabase"
import { TApkVersions } from "@/types"


type TFeatureCard = React.HTMLAttributes<HTMLLIElement> & {
	image: string,
}

const FeatureCard = ({ image, ...props }: TFeatureCard) => {
	return (
		<li {...props}>
			<img src={image} className="object-contain w-full h-full aspect-auto" />
		</li>
	)
}


const images = [dashboard, locking, notification, routing, reports]

const Home = () => {

	const [apk, setApk] = useState<TApkVersions | null>(null)

	useEffect(() => {
		const fetchAppLink = async () => {
			try {
				const { data, error } = await supabase.from("apk_versions").select("*").order("created_at", { ascending: false })

				if (error) throw error

				setApk(data[0])

			} catch (error) {
				console.error(error);
			}
		}

		fetchAppLink()
	}, [])

	const handleDownload = (link: string) => {
		window.open(link)
	}

	return (
		<main className="w-full flex flex-col gap-10">
			<section className="flex flex-col sm:max-w-md lg:max-w-2xl gap-4 text-brand-800">
				<h1 className="font-bold text-2xl lg:text-4xl">What is JCi-N?</h1>
				<p className="text-base lg:text-lg text-neutral-500">JCi-N is a mobile app prototype that tracks IoT trash cans, developed for the project "Enhancing Garbage Management: A Mobile-Integrated, Solar-Powered Waste Collection System."</p>
				<div>
					{apk ? (
						<>
							<Button
								variant="default"
								className="max-w-max flex gap-2"
								onClick={() => handleDownload(apk.link)}
							>
								<p>Download App</p>
								<ArrowRight />
							</Button>
							{/* Note */}
							<p className="text-xs italic text-neutral-500/80 mt-3 md:text-sm">
								* Note: {apk?.notes}
							</p>
						</>
					) : (
						<>
							{/* Skeleton for button */}
							<div className="h-10 w-36 bg-neutral-300 dark:bg-neutral-700 animate-pulse rounded-lg"></div>
							{/* Skeleton for note */}
							<div className="h-4 w-64 bg-neutral-200 dark:bg-neutral-800 animate-pulse rounded mt-3"></div>
						</>
					)}
				</div>

			</section>
			<section className="text-brand-800 flex flex-col gap-4">
				<h2 className="font-bold text-xl lg:text-2xl md:col-span-3 lg:col-span-4">Features 🚀</h2>
				<ul className="grid text-sm gap-2 md:grid-cols-2 max-w-md">
					{features.map(({ feature }, index) => <li key={`features-${index}`}>- {feature}</li>)}

				</ul>
				<ul className="grid gap-4 grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
					{images.map((image, index) => <FeatureCard image={image} key={index} />)}
				</ul>
			</section>
		</main>
	)
}

export default Home
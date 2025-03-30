import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import React from "react"
import features from "@/data/features.json"
import dashboard from "@/assets/screenshots/Dashboard.png"
import locking from "@/assets/screenshots/Locking.png"
import notification from "@/assets/screenshots/Notification.png"
import routing from "@/assets/screenshots/Route.png"
import reports from "@/assets/screenshots/Reports.png"


type TFeatureCard = React.HTMLAttributes<HTMLLIElement> & {
	image: string ,
}

const FeatureCard = ({ image, ...props }: TFeatureCard) => {
	return (
		<li {...props}>
			<img src={image} className="object-contain w-full h-full aspect-auto"/>
		</li>
	)
}


const images = [dashboard, locking, notification, routing, reports]

const Home = () => {
	return (
		<main className="w-full flex flex-col gap-10">
			<section className="flex flex-col sm:max-w-md lg:max-w-2xl gap-4 text-brand-800">
				<h1 className="font-bold text-2xl lg:text-4xl">What is JCi-N?</h1>
				<p className="text-base lg:text-lg text-neutral-500">JCi-N is a mobile app prototype that tracks IoT trash cans, developed for the project "Enhancing Garbage Management: A Mobile-Integrated, Solar-Powered Waste Collection System."</p>
				<Button variant="default" className="max-w-max flex gap-2">
					<p>Download App</p>
					<ArrowRight />
				</Button>
			</section>
			<section className="text-brand-800 flex flex-col gap-4">
				<h2 className="font-bold text-xl lg:text-2xl md:col-span-3 lg:col-span-4">Features 🤖</h2>
				<ul className="grid text-sm gap-2 md:grid-cols-2 max-w-md">
					{features.map(({ feature }, index) => <li key={`features-${index}`}>- {feature}</li>)}

				</ul>
				<ul className="grid gap-4 grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
					{images.map((image, index) => <FeatureCard image={image} key={index}/>)}
				</ul>
			</section>
		</main>
	)
}

export default Home
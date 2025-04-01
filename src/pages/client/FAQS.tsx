import FAQSSkeleton from "@/components/skeletons/FAQSSkeleton";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { TFaqs } from "@/types";
import supabase from "@/utils/supabase";
import { useEffect, useState } from "react";

const FAQS = () => {

	const [faqs, setFaqs] = useState<TFaqs[] | null>(null)

	useEffect(() => {
		const fetchFAQS = async () => {
			try {
				const { data, error } = await supabase.from("faqs").select("*").order("created_at", { ascending: true }) 

				if(error) throw error

				setFaqs(data)
			} catch (error) {
				console.error(error);
			}
		}

		fetchFAQS()
	}, [])


	return (
		<main className="w-full text-neutral-700">
			{/* Header Section */}
			<section className="flex flex-col sm:max-w-md lg:max-w-2xl gap-4">
				<h1 className="font-bold text-2xl lg:text-4xl ">Frequently Asked Questions (FAQs)</h1>
				<p>
					Welcome to <span className="font-bold">Enhancing Garbage Waste Collection: A Mobile Integration Solar Powered System</span>.
					Below are some frequently asked questions to help you understand how our system works.
				</p>
			</section>

			{/* FAQ Section */}
			<section className="text-sm md:text-base flex flex-col gap-4 mt-8">
				<Accordion type="single" collapsible className="max-w-[800px] w-full">
					{faqs ? faqs.map((item, index) => {
						return <AccordionItem value={`item-${index + 1}`}>
						<AccordionTrigger className="lg:text-lg">{item.question}</AccordionTrigger>
						<AccordionContent className="lg:text-base">
							{item.answer}
						</AccordionContent>
					</AccordionItem>
					}) : <FAQSSkeleton />}
				</Accordion>
			</section>
		</main>
	);
};

export default FAQS;
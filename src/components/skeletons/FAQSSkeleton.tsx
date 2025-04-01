import {  AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"

const FAQSSkeleton = () => {
	return (
		Array.from({ length: 5 }).map((_, index) => <AccordionItem value={`skeleton-${index}`}>
			<AccordionTrigger className="lg:text-lg">
				{/* Skeleton loader for the question */}
				<div className="h-6 w-3/4 bg-gray-300 animate-pulse rounded-md"></div>
			</AccordionTrigger>
			<AccordionContent className="lg:text-base">
				{/* Skeleton loader for the content */}
				<div className="h-4 w-full bg-gray-300 animate-pulse rounded-md mb-2"></div>
				<div className="h-4 w-3/4 bg-gray-300 animate-pulse rounded-md"></div>
			</AccordionContent>
		</AccordionItem>)
	)
}

export default FAQSSkeleton
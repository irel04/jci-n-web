import webLogo from "@public/web-logo-2.png"

const Footer = () => {
	return (
		<footer className="border-t-neutral-500/50 border-t-[1px] py-4 px-8 grid gap-4 md:grid-cols-2 text-sm md:text-base w-full">
			<div className="flex flex-col gap-2 text-neutral-500/85 text-xs md:text-sm">
				<a href="/"><img src={webLogo} alt="" className="w-28"/></a>
				<p>This is a mobile and web application developed for a research project titled <span className="font-bold">Enhancing Garbage Management: A Mobile-Integrated, Solar-Powered Waste Collection System</span>.</p>
				<p>Deployed at <span className="font-bold">Vercel</span></p>
			</div>
			<div className="flex text-xs flex-col md:flex-row md:text-sm gap-1 md:gap-4 text-neutral-500/80">
				<p>Contact Us</p>
				<p>Terms and Condition</p>
				<p>Privacy Policy</p>
				<p>Frequently Asked Questions</p>
			</div>
		</footer>
	)
}

export default Footer
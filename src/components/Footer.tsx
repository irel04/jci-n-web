import Login from "@/components/Login"
import { Button } from "@/components/ui/button"
import webLogo from "@public/web-logo-2.png"
import { Lock } from "lucide-react"
import { useState } from "react"

const Footer = () => {

	const [isOpen, setIsOpen] = useState<boolean>(false)

	
	return (
		<>
			<Login isOpen={isOpen} handleClose={() => setIsOpen(false)}/>
			<footer className="border-t-neutral-500/50 border-t-[1px] py-4 px-8 grid gap-4 md:grid-cols-2 text-sm md:text-base w-full">
				<div className="flex flex-col gap-2 text-neutral-500/85 text-xs md:text-sm">
					<a href="/"><img src={webLogo} alt="" className="w-28" /></a>
					<p>This is a mobile and web application developed for a research project titled <span className="font-bold">Enhancing Garbage Management: A Mobile-Integrated, Solar-Powered Waste Collection System</span>.</p>
					<p>Deployed at <span className="font-bold">Vercel</span></p>
				</div>
				<ul className="flex text-xs flex-col md:flex-row md:text-sm gap-1 md:gap-4 text-neutral-500/80">
					<li><a href="/contact-us">Contact Us</a></li>
					<li><a href="/terms-and-conditions">Terms and Conditions</a></li>
					<li><a href="/privacy-policy">Privacy Policy</a></li>
					<li><a href="/faq">Frequently Asked Questions</a></li>
				</ul>
				<div className="md:col-start-2 flex justify-end">
					<Button variant="secondary" className="text-xs" onClick={() => setIsOpen(true)}>
						<Lock />
						<p>Login as Admin</p>
					</Button>
				</div>
			</footer>

		</>
	)
}

export default Footer
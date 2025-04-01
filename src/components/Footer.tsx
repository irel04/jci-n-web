import { useAuth } from "@/auth/auth.module"
import Login from "@/components/modals/Login"
import { Button } from "@/components/ui/button"
import webLogo from "@public/web-logo-2.png"
import { Lock } from "lucide-react"
import { useState } from "react"
import { useNavigate } from "react-router"
import { ArrowRight } from "lucide-react"
import ContactUs from "@/components/modals/ContactUs"
import { useSearchParams } from "react-router"


const Footer = () => {

	const [searchParam, setSearchParam] = useSearchParams()


	const [isOpen, setIsOpen] = useState<boolean>(false)
	const [isContactUsOpen, setIsContactUsOpen] = useState<boolean>(searchParam.get("contact_us") ? true : false )

	const { session } = useAuth()
	const navigate = useNavigate()

	const handleClickButton = async () => {
		if(session){
			navigate("/admin")
		} else {
			setIsOpen(true)
		}
	}



	const handleCloseContactUs = () => {
		setIsContactUsOpen(false)
		if (searchParam.get("contact_us")) {
			searchParam.delete("contact_us")
			setSearchParam(searchParam)
		}
	}


	
	return (
		<>
			<Login isOpen={isOpen} handleClose={() => setIsOpen(false)}/>
			<ContactUs isOpen={isContactUsOpen} onClose={handleCloseContactUs}/>
			<footer className="border-t-neutral-500/50 border-t-[1px] py-4 px-8 grid gap-4 md:grid-cols-2 text-sm md:text-base w-full">
				<div className="flex flex-col gap-2 text-neutral-500/85 text-xs md:text-sm">
					<a href="/"><img src={webLogo} alt="" className="w-28" /></a>
					<p>This is a mobile and web application developed for a research project titled <span className="font-bold">Enhancing Garbage Management: A Mobile-Integrated, Solar-Powered Waste Collection System</span>.</p>
					<p>Deployed at <span className="font-bold">Vercel</span></p>
				</div>
				<ul className="flex text-xs flex-col md:flex-row md:text-sm gap-1 md:gap-4 text-neutral-500/80">
					<li onClick={() => setIsContactUsOpen(true)} className="cursor-pointer">Contact Us</li>
					<li><a href="/terms-and-conditions">Terms and Conditions</a></li>
					<li><a href="/privacy-policy">Privacy Policy</a></li>
					<li><a href="/faq">FAQs</a></li>
				</ul>
				<div className="md:col-start-2 flex justify-end">
					<Button variant={session ? "link" : "secondary"} className="text-xs" onClick={handleClickButton}>
						{!session && <Lock />}
						<p>{session ? "Go to admin" : "Login as Admin"}</p>
						{session && <ArrowRight/>}
					</Button>
				</div>
			</footer>

		</>
	)
}

export default Footer
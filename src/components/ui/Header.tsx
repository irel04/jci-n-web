// import logo from "@public/assets/logo.png"
import githubLogo from "@/assets/icons/github-logo.svg"
import faqs from "@/assets/icons/faqs.svg"
import { useEffect, useState } from "react"
import webLogo from "@public/web-logo-2.png"

function Header() {

	const [isTopPosition, setIsTopPosition] = useState<boolean>(true)

	useEffect(() => {
		const handleCheckPosition = () => {
			setIsTopPosition(window.scrollY === 0);
		}

		window.addEventListener("scroll",handleCheckPosition)

		return () => window.removeEventListener("scroll", handleCheckPosition)
	}, [])

	return (
		<header className={`absolute flex py-2 px-10 items-center font-header gap-4 shadow w-full h-20 z-10 bg-white transition-transform duration-200 ease-out ${isTopPosition ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}>
			<div className="flex-1">
				<img src={webLogo} alt="" className="w-32 2xl:w-56 aspect-auto" />
			</div>
			<button className="flex-none flex items-center gap-2">
				<img src={githubLogo} alt="" className="w-7 aspect-auto" title="Checkout Repo" />
				<p className="hidden md:block">Checkout Our Repo</p>
			</button>
			<button className="flex-none flex items-center gap-2">
				<img src={faqs} alt="" className="w-9 aspect-auto" title="Checkout Repo" />
				<p className="hidden md:block">FAQS</p>
			</button>

		</header>
	)
}

export default Header
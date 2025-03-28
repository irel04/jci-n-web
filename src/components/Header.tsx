// import logo from "@public/assets/logo.png"
import { useEffect, useState } from "react"
import webLogo from "@public/web-logo-2.png"
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"

import devs from "@/data.json"
import jb from "@/assets/devs/jb.png"
import nico from "@/assets/devs/nico.png"
import cris from "@/assets/devs/cris.png"
import irel from "@/assets/devs/irel.png"





function Header() {

	const [isTopPosition, setIsTopPosition] = useState<boolean>(true)
	const profile = [jb, nico, irel, cris]

	useEffect(() => {
		const handleCheckPosition = () => {
			setIsTopPosition(window.scrollY === 0);
		}

		window.addEventListener("scroll", handleCheckPosition)

		return () => window.removeEventListener("scroll", handleCheckPosition)
	}, [])

	return (
		<header className={`absolute flex py-2 px-10 items-center gap-4 shadow w-full h-20 z-10 bg-white transition-transform duration-200 ease-out ${isTopPosition ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}>
			<img src={webLogo} alt="" className="w-32 2xl:w-56 aspect-auto" />
			<NavigationMenu className="hidden md:block ">
				<NavigationMenuList>
					<NavigationMenuLink>Home</NavigationMenuLink>
					<NavigationMenuItem className="w-full">
						<NavigationMenuTrigger>Our Team</NavigationMenuTrigger>
						<NavigationMenuContent>
							<div className="w-[500px] grid grid-cols-2 gap-3">
								{devs.map((item, index) => <NavigationMenuLink>
									<div className="flex flex-col gap-1 items-center">
										<img src={profile[index]} alt="" className="w-16 rounded-full object-cover"/>
										<p className="text-base font-semibold text-neutral-700">{item.name}</p>
										<p className="text-sm text-neutral-500/75 text-center">{item.description}</p>
									</div>
								</NavigationMenuLink>)}
								
							</div>

						</NavigationMenuContent>
					</NavigationMenuItem>
				</NavigationMenuList>
			</NavigationMenu>


		</header>
	)
}

export default Header
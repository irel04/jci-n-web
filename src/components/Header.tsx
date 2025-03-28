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
import { CircleHelp, Search } from "lucide-react"





function Header() {

	const profile = [jb, nico, irel, cris]


	return (
		<header className={`absolute flex py-2 px-3 md:px-10 items-center shadow w-full h-20 z-10 gap-2 bg-white `}>
			<div className="flex-1 flex items-center gap-4 lg:gap-10">
				<a href="/">
					<img src={webLogo} alt="" className="w-32 2xl:w-56 aspect-auto" />
				</a>
				<NavigationMenu className="hidden md:block text-neutral-700 font-medium">
					<NavigationMenuList>
						<NavigationMenuLink >Home</NavigationMenuLink>
						<NavigationMenuItem>
							<NavigationMenuTrigger>Our Team</NavigationMenuTrigger>
							<NavigationMenuContent>
								<ul className="w-[500px] grid grid-cols-2 gap-3">
									{devs.map((item, index) => <li>
										<NavigationMenuLink asChild>
											<a href={item.link} className="flex flex-col gap-1 items-center">
												<img src={profile[index]} alt="" className="w-16 rounded-full object-cover" />
												<p className="text-base font-semibold text-neutral-700">{item.name}</p>
												<p className="text-sm text-neutral-500/75 text-center">{item.description}</p>
											</a>
										</NavigationMenuLink>
									</li>)}
								</ul>
							</NavigationMenuContent>
						</NavigationMenuItem>
						<NavigationMenuItem>
							<NavigationMenuTrigger>Repositories</NavigationMenuTrigger>

							<NavigationMenuContent>
								<ul className="w-96 grid gap-3">
									<li>
										<NavigationMenuLink asChild>
											<a href="https://github.com/irel04/jci-n-mobile" className="flex flex-col gap-1">
												<p className="text-base font-semibold text-neutral-700">Mobile App</p>
												<p className="text-sm text-neutral-500/75">This is a mobile application built using expo framework</p>
											</a>
										</NavigationMenuLink>
									</li>
									<li>
										<NavigationMenuLink asChild>
											<a href="https://github.com/irel04/jci-n-web" className="flex flex-col gap-1">
												<p className="text-base font-semibold text-neutral-700">Website Application</p>
												<p className="text-sm text-neutral-500/75">This is created using vite + react with react-router</p>
											</a>
										</NavigationMenuLink>
									</li>
								</ul>
							</NavigationMenuContent>
						</NavigationMenuItem>

					</NavigationMenuList>
				</NavigationMenu>
			</div>

			{/* Search and faqs */}
			<button className="border-neutral-500/70 border-[1px] py-1 px-2 rounded-sm text-sm lg:text-base text-neutral-500/70 flex gap-4 items-center cursor-pointer">
				<p className="text-sm">Search...</p>
				<Search color="#737373" size={18} className="" />
			</button>
			<CircleHelp color="#737373" size={18}/>
		</header>
	)
}

export default Header
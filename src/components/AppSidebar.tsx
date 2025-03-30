import { CircleHelp, LogOut, Phone, UserCog } from "lucide-react"
import webIcon from "@public/web-icon.png"

import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarSeparator,
} from "@/components/ui/sidebar"
import { useAuth } from "@/auth/auth.module"
import { useLocation } from "react-router"

// Menu items.
const items = [
	{
		title: "On-boarding",
		url: "/admin",
		icon: UserCog,
	},
	{
		title: "Contact Us",
		url: "#",
		icon: Phone,
	},
	{
		title: "FAQS",
		url: "#",
		icon: CircleHelp
	}
]


export function AppSidebar() {

	const { logout } = useAuth()

	const handleLogout = async () => {
		try {
			await logout("/")
		} catch (error) {
			console.error(error)
		}
	} 


	const { pathname } = useLocation()
	return (
		<Sidebar>
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel className="h-max py-2">
						<img src={webIcon} alt="" className="w-10 aspect-square " />
						<div className="ml-4 flex flex-col ">
							<p className="col-span-2 text-xl font-bold text-neutral-700">JCi-N</p>
							<p className="text-neutral-500">Admin website</p>
						</div>
					</SidebarGroupLabel>
					<SidebarSeparator className="mb-4" />
					<SidebarGroupContent className="flex-1">
						<SidebarMenu>
							{items.map((item) => (
								<SidebarMenuItem key={item.title}>
									<SidebarMenuButton asChild className="py-4 text-neutral-700" isActive={pathname===item.url}>
										<a href={item.url}>
											<item.icon />
											<span>{item.title}</span>
										</a>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>

			</SidebarContent>
			<SidebarFooter >
				<SidebarMenu >
					<SidebarMenuItem>
						<SidebarMenuButton asChild className="cursor-pointer" onClick={handleLogout}>
							<div>
								<LogOut color="#CF1919" className="rotate-180"/>
								<span className="text-neutral-700">Sign out</span>
							</div>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarFooter>
		</Sidebar>
	)
}

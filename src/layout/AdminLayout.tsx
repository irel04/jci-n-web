import { useAuth } from "@/auth/auth.module"
import { AppSidebar } from "@/components/AppSidebar"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Navigate, Outlet } from "react-router"

const AdminLayout = () => {

	const { session } = useAuth()

	const is_admin = localStorage.getItem("is_admin") || false

	
	
	if(session===undefined) return 

	if(session === null &&  !is_admin) return <Navigate to="/"/>

	return (
		<SidebarProvider>
			<AppSidebar />
			<main className="border-red-500 border-2 p-4 flex-1">
				<div className="flex items-center gap-2 lg:hidden">
					<SidebarTrigger />
					<h1 className="text-neutral-500 text-lg"> Admin / On-Boarding </h1> 
				</div>
				<Outlet/>
			</main>
		</SidebarProvider>
	)
}

export default AdminLayout
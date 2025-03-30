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
			<main>
				<SidebarTrigger  className="lg:hidden" />
				<Outlet/>
			</main>
		</SidebarProvider>
	)
}

export default AdminLayout
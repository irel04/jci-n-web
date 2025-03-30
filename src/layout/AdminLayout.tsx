import { useAuth } from "@/auth/auth.module"
import { Navigate, Outlet } from "react-router"

const AdminLayout = () => {

	const { session } = useAuth()

	const is_admin = localStorage.getItem("is_admin") || false
	
	if(session===undefined) return 


	return session && is_admin ? <Outlet/> : <Navigate to="/"/>
}

export default AdminLayout
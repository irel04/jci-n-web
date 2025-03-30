import { useAuth } from "@/auth/auth.module"
import { Navigate, Outlet } from "react-router"

const AdminLayout = () => {

	const { session } = useAuth()


	return session && session.is_admin ? <Outlet/> : <Navigate to="/"/>
}

export default AdminLayout
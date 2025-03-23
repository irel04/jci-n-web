import { useAuth } from "@src/context/auth/auth.module"
import { Navigate, Outlet } from "react-router"

const PrivateLayout = () => {

	const { session } = useAuth()

	return session ? <Outlet /> : <Navigate to={"/"}/>
}

export default PrivateLayout
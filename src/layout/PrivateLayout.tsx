import { useAuth } from "@src/context/auth/auth.module"
import Login from "@src/components/ui/Login"
import { Outlet } from "react-router"

const PrivateLayout = () => {

	const { session } = useAuth()

	return session ? <Outlet /> : <Login />
}

export default PrivateLayout
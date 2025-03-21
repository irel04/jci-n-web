import { useAuth } from "@src/auth/provider/AuthContext"
import Login from "@src/components/ui/Login"
import {  Outlet } from "react-router"

const PrivateLayout = () => {

	const { session } = useAuth()

	return session ? <Outlet/> : <Login/>
}

export default PrivateLayout
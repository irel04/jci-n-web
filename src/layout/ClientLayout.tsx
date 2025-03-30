import Footer from "@/components/Footer"
import Header from "@/components/Header"
import { Outlet } from "react-router"

const ClientLayout = () => {
	return (
		<>
			<Header />
			<div className="p-10 flex-1 pt-34">
				<Outlet />
			</div>
			<Footer />
		</>
	)
}

export default ClientLayout
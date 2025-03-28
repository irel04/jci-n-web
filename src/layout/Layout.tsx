import Footer from "@/components/Footer"
import Header from "@/components/Header"
import { Outlet } from "react-router"

const Layout = () => {
	return (
		<div className="h-screen bg-app-white dark:bg-neutral-800">
			{/* Wrapper */}
			<div className="relative h-full max-w-[2560px] mx-auto flex flex-col">
				<Header/>
				<div className="p-10 flex-1 pt-24">
					<Outlet />
				</div>
				<Footer/>
			</div>
		</div>
	)
}

export default Layout

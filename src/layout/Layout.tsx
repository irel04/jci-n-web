import { Footer, Header } from "@src/components"
import { Outlet } from "react-router"

const Layout = () => {
	return (
		<div className="h-screen w-screen bg-app-white dark:bg-neutral-800">
			{/* Wrapper */}
			<div className="w-full h-full max-w-[2560px] mx-auto flex flex-col">
				<Header/>
				<div className="p-4 flex-1 pt-24">
					<Outlet />
				</div>
				<Footer/>
			</div>
		</div>
	)
}

export default Layout

import { Outlet } from "react-router"

// General Layout
const Layout = () => {

	return (
		<div className="h-screen bg-app-white dark:bg-neutral-800">
			{/* Wrapper */}
			<div className="relative h-full max-w-[2560px] mx-auto flex flex-col">
				<Outlet/>
			</div>
		</div>
	)
}

export default Layout

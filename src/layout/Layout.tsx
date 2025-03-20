import { Outlet } from "react-router"

const Layout = () => {
	return (
		<div className="min-h-screen w-screen">
			{/* Wrapper */}
			<div className="w-full max-w-[2560px] p-4 mx-auto border-red-500 border-2">
				<Outlet />
			</div>
		</div>
	)
}

export default Layout

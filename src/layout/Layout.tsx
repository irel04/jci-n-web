import Footer from "@/components/Footer"
import Header from "@/components/Header"
import { useMemo } from "react"
import { Outlet, useLocation } from "react-router"


const Layout = () => {

	const { pathname } = useLocation()

	const isPathNameIncluded = useMemo(() => {
		return ["/404", "/embedded-system"].some(item => item === pathname)
	}, [pathname])

	return (
		<div className="h-screen bg-app-white dark:bg-neutral-800">
			{/* Wrapper */}
			<div className="relative h-full max-w-[2560px] mx-auto flex flex-col">
				{/* Only loads the Header and footer when path is included in the array above */}
				{isPathNameIncluded ? <Outlet />
					:
					<>
						<Header />
						<div className="p-10 flex-1 pt-34">
							<Outlet />
						</div>
						<Footer />
					</>
				}
			</div>
		</div>
	)
}

export default Layout

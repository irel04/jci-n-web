
const NotFound = () => {
	return (
		<div className="justify-center flex flex-col items-center flex-1 p-20">
			<h1 className="text-2xl lg:text-4xl font-bold text-neutral-500 text-center">404 - Page Not Found</h1>
			<p className="text-base lg:text-lg text-gray-600 mt-2 text-center">
				Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
			</p>
			<a href="/" className="mt-4 px-4 py-2 bg-brand-500 text-white rounded hover:bg-brand-600 text-sm md:text-base">
				Go Back Home
			</a>
		</div>
	)
}

export default NotFound
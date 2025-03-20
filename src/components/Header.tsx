// import logo from "@public/assets/logo.png"
import githubLogo from "@src/assets/icons/github-logo.svg"
import faqs from "@src/assets/icons/faqs.svg"

function Header() {
	return (
		<header className="flex-none flex py-4 px-8 items-center font-header gap-4 shadow">
			<div className="flex-1">
				<button className="bg-neutral-500/50 p-4  w-36 text-center rounded-md text-white">Logo Icon</button>
			</div>
			<button className="flex-none flex items-center gap-2">
				<img src={githubLogo} alt="" className="w-7 aspect-auto" title="Checkout Repo" />
				<p className="hidden md:block">Checkout Our Repo</p>
			</button>
			<button className="flex-none flex items-center gap-2">
				<img src={faqs} alt="" className="w-8 aspect-auto" title="Frequent Ask Questions" />
				<p className="hidden md:block">FAQS</p>
			</button>

		</header>
	)
}

export default Header
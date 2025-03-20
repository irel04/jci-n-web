import { Input } from "@src/components"

const EditProfile = () => {
	return (
		<>
			<div className="max-w-[500px]">
				<h1 className="text-xl font-bold md:text-2xl text-brand-700">Edit Profile</h1>
				<form className="mt-4 flex flex-col gap-6 md:gap-8">
					<div className="grid grid-cols-1 gap-1 md:grid-cols-2">
						<p className="font-semibold md:col-span-2">Personal Details</p>
						<Input label="First Name" />
						<Input label="Last Name" />
						<Input label="Birthday" />
						<Input label="Phone Number" />
						<Input label="Address" />
					</div>

					<div className="grid grid-cols-1 gap-1 md:grid-cols-2">
						<p className="font-semibold md:col-span-2">Security</p>
						<Input label="Email" />
						<Input label="Password" />
					</div>

					<div className="flex justify-end">
						<button className="px-4 py-2 bg-brand-300 rounded-md text-app-white max-w-40">Saved</button>
					</div>
				</form>
			</div>
		</>
	)
}

export default EditProfile
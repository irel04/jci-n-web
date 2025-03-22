import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@src/components";
import Login from "@src/components/ui/Login";
import { useAuth } from "@src/context/auth/auth.module";
import { TBaseProfile } from "@src/types";
import supabase from "@src/utils/supabase";
import { PostgrestError } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ZProfile } from "@src/validation";

const EditProfile = () => {
	const { session, logout } = useAuth();
	const [userData, setUserData] = useState<TBaseProfile | null>(null);

	const handleLogout = async () => {
		await logout();
	};

	const fetchUser = async () => {
		if (!session) return;

		try {
			const { data, error } = await supabase
				.from("users_details")
				.select("*")
				.eq("auth_id", session.user.id)
				.single();

			if (error) throw error;

			setUserData(data as TBaseProfile);
		} catch (error) {
			console.error("Supabase error: ", (error as PostgrestError).message);
		}
	};

	useEffect(() => {
		const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
			if (event === "TOKEN_REFRESHED") {
				setTimeout(handleLogout, 0);
			}
		});

		return () => subscription.unsubscribe();
	}, []);

	// Initialize useForm
	const {
		register,
		formState: { errors },
		handleSubmit,
		reset,
	} = useForm<TBaseProfile & { password: string }>({
		resolver: zodResolver(ZProfile),
		mode: "onChange",
		defaultValues: {}, 
	});

	useEffect(() => {
		fetchUser();
	}, [session]);

	useEffect(() => {
		if (userData) {
			reset(userData); 
		}
	}, [userData, reset]);

	const handleSubmitUpdate = async (payload: TBaseProfile) => {
		console.log(payload);
	};

	return (
		<>
			<Login isOpen={!session} showCloseButton={false} />
			<div className="max-w-[500px]">
				<h1 className="text-xl font-bold md:text-2xl text-brand-700">Edit Profile</h1>
				<form className="mt-4 flex flex-col gap-6 md:gap-8" onSubmit={handleSubmit(handleSubmitUpdate)}>
					<div className="grid grid-cols-1 gap-4 md:grid-cols-2 ">
						<p className="font-semibold md:col-span-2">Personal Details</p>
						<Input label="First Name" {...register("first_name")} error={errors["first_name"]} />
						<Input label="Last Name" {...register("last_name")} error={errors["last_name"]} />
						<Input label="Birthday" {...register("birthdate")} error={errors["birthdate"]} />
						<Input label="Phone Number" {...register("phone_number")} error={errors["phone_number"]} />
						<Input label="Address" {...register("address")} error={errors["address"]} />
					</div>

					<div className="grid grid-cols-1 gap-1 md:grid-cols-2">
						<p className="font-semibold md:col-span-2">Security</p>
						<Input label="Email" {...register("email_address")} error={errors["email_address"]} />
						<Input label="Password" type="password" {...register("password")} error={errors["password"]} />
					</div>

					<div className="flex justify-end">
						<button className="px-4 py-2 bg-brand-300 rounded-md text-app-white max-w-40" type="submit">
							Save
						</button>
					</div>
				</form>
			</div>
		</>
	);
};

export default EditProfile;

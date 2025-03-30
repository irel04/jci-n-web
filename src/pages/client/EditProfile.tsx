import Input from "@/components/Input";
import InputCalendar from "@/components/InputCalendar";
import Login from "@/components/Login";
import { useAuth } from "@/context/auth/auth.module";
import { TBaseProfile } from "@/types";
import supabase from "@/utils/supabase";
import { ZProfile } from "@/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { PostgrestError } from "@supabase/supabase-js";
import { useCallback, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";

const EditProfile = () => {
	const { session, logout } = useAuth();
	const [userData, setUserData] = useState<TBaseProfile | null>(null);

	const handleLogout = useCallback(async () => {
		try {
			await logout();
		} catch (error) {
			console.error('Unexpected error:', error);
		}
	}, [logout]); // Dependencies: logout function



	useEffect(() => {
		const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
			if (event === "TOKEN_REFRESHED") {
				setTimeout(handleLogout, 0);
			}
		});

		return () => subscription.unsubscribe();
	}, [handleLogout]);

	// Initialize useForm
	const {
		register,
		formState: { errors, isDirty },
		handleSubmit,
		reset,
		control } = useForm<TBaseProfile & { password?: string }>({
			resolver: zodResolver(ZProfile),
			mode: "onChange",
			defaultValues: userData || {}, // Ensure default values are set initially
		});

	useEffect(() => {

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

		fetchUser();
	}, [session]);

	useEffect(() => {
		if (userData) {
			reset(userData);
		}
	}, [userData, reset]);

	const handleSubmitUpdate = async (payload: TBaseProfile) => {

		const { password, ...otherDetails } = payload

		const loading = toast.loading("Please wait...")

		try {
			const { error } = await supabase.from("users_details").update(otherDetails).eq("auth_id", session?.user.id)

			if (error) throw error

			if (password !== "" && password !== null && password !== undefined) {

				const { error: authError } = await supabase.auth.updateUser({
					email: otherDetails.email_address,
					password: password
				})

				if (authError) throw authError
			}

			toast.update(loading, { render: "Saved Successfully", isLoading: false, autoClose: 3000, type: "success", hideProgressBar: true })
		} catch (error) {
			toast.update(loading, { render: "Something went wrong", isLoading: false, autoClose: 3000, type: "error", hideProgressBar: true })
			console.error(error)
		}
	};


	return (
		<>
			<Login isOpen={!session} showCloseButton={false} />
			<div className="max-w-[500px]">
				<h1 className="text-xl font-bold md:text-2xl text-brand-700">Edit Profile</h1>
				<form className="mt-4 flex flex-col gap-6 md:gap-8" onSubmit={handleSubmit(handleSubmitUpdate)} autoComplete="off">
					<div className="grid grid-cols-1 gap-4 md:grid-cols-2 ">
						<p className="font-semibold md:col-span-2">Personal Details</p>
						<Input label="First Name" {...register("first_name")} error={errors["first_name"]} />
						<Input label="Last Name" {...register("last_name")} error={errors["last_name"]} />
						<Controller control={control} name="birthdate" render={({ field: { onChange, value }, fieldState: { error } }) => {
							return <InputCalendar onChange={onChange} label="Birthday" defaultValue={value} error={error} />
						}} />
						<Input label="Phone Number" {...register("phone_number")} error={errors["phone_number"]} />
						<Input label="Address" {...register("address")} error={errors["address"]} />
					</div>

					<div className="grid grid-cols-1 gap-1 md:grid-cols-2">
						<p className="font-semibold md:col-span-2">Security</p>
						<Input label="Email" {...register("email_address")} error={errors["email_address"]} />
						<Input label="Password" type="password" {...register("password")} error={errors["password"]} autoComplete="new-password" placeholder="***********" />
					</div>

					<div className="flex justify-end">
						<button className={`px-4 py-2 bg-brand-300 rounded-md text-app-white max-w-40 ${!isDirty ? "bg-neutral-200 text-neutral-400" : ""}`} type="submit" disabled={!isDirty}>
							Save
						</button>
					</div>
				</form>
			</div>
		</>
	);
};

export default EditProfile;

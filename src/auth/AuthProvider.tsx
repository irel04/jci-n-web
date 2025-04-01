import { AuthContext } from "@/auth/auth.module";
import { TAuth, TLogin } from "@/types";
import supabase from "@/utils/supabase";
import { Session } from "@supabase/supabase-js";
import { ReactNode, useEffect, useState } from "react";


type Props = {
	children: ReactNode
}



const AuthProvider = ({ children }: Props) => {

	const [session, setSession] = useState<Session | null | undefined>(undefined)

	useEffect(() => {
		supabase.auth.getSession().then(({ data: { session } }) => {
			setSession(session)
		})

		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange((_event, session) => {
			setSession(session)
		})

		return () => subscription.unsubscribe()
	}, [])



	// Checking if the user is admin
	useEffect(() => {

		const fetchUser = async () => {
			try {
				const { data, error } = await supabase.from("users_details").select("is_admin").eq("auth_id", session?.user.id).single()

				if (error) throw error

				localStorage.setItem("is_admin", data.is_admin)
				
				

			} catch (error) {
				console.error(error)

			}
		}

		fetchUser()

	}, [session?.user.id])


	const login = async (payload: TLogin) => {
		const { email, password } = payload
		const { error } = await supabase.auth.signInWithPassword({ email, password })

		if (error) throw error

	}

	const logout = async (redirectTo?: string) => {

		const { error } = await supabase.auth.signOut({ scope: "local" })

		if (error) throw error

		localStorage.removeItem("is_admin")

		if (redirectTo) window.location.href = redirectTo

	}

	

	const value: TAuth = {
		login,
		logout,
		session,
		setSession
	}

	return <AuthContext.Provider value={value}>
		{children}
	</AuthContext.Provider>
}



export default AuthProvider;
import { AuthContext } from "@/auth/auth.module";
import { TAuth, TExtendedSession, TLogin } from "@/types";
import supabase from "@/utils/supabase";
import { ReactNode, useEffect, useState } from "react";


type Props = {
	children: ReactNode
}



const AuthProvider = ({ children }: Props) => {

	const [session, setSession] = useState<TExtendedSession | null>(null)

	useEffect(() => {
		const { data: { subscription } } = supabase.auth.onAuthStateChange(
			(event, session) => {
				if (event === 'SIGNED_OUT') {
					setSession(null)
				} else if (session) {
					setSession(session)
				}
			})
		return () => {
			subscription.unsubscribe()
		}
	}, [])

	// Checking if the user is admin
	useEffect(() => {

		const fetchUser = async () => {
			try {
				const { data, error } = await supabase.from("users_details").select("is_admin").eq("auth_id", session?.user.id).single()

				if (error) throw error

				setSession((prev) => (prev ? { ...prev, is_admin: data.is_admin } : prev));
				

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

		if (redirectTo) window.location.href = redirectTo

	}

	useEffect(() => {
		const { data: { subscription } } = supabase.auth.onAuthStateChange(
			(event, session) => {
				if (event === 'SIGNED_OUT') {
					setSession(null)
				} else if (session) {
					setSession(session)
				}
			})
		return () => {
			subscription.unsubscribe()
		}
	}, []);


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
import { AuthContext } from "@src/context/auth/auth.module";
import { TAuth, TLogin } from "@src/types";
import supabase from "@src/utils/supabase";
import { Session } from "@supabase/supabase-js";
import { ReactNode, useEffect, useState } from "react";


type Props = {
	children: ReactNode
}

const AuthProvider = ({ children }: Props) => {

	const [session, setSession] = useState<Session | null>(null)

	useEffect(() => {
		const {data: { subscription }} = supabase.auth.onAuthStateChange(
			(event, session) => {
			  if (event === 'SIGNED_OUT') {
				setSession(null)
			  } else if(event === "TOKEN_REFRESHED"){
				setSession(null)
			  } else if (session) {
				setSession(session)
			  }
			})
		  return () => {
			subscription.unsubscribe()
		  }
	  }, []);
	

	const login = async (payload: TLogin) => {
		const { email, password } = payload
		const { error } = await supabase.auth.signInWithPassword({ email, password })

		if (error) throw error

	}

	const logout = async (redirectTo?: string) => {

		const { error } = await supabase.auth.signOut({ scope: "local" })

		if (error) throw error

		if (redirectTo) window.location.href = redirectTo

		setSession(null)
	}

	useEffect(() => {
		const {data: { subscription }} = supabase.auth.onAuthStateChange(
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
		session
	}

	return <AuthContext.Provider value={value}>
		{children}
	</AuthContext.Provider>
}



export default AuthProvider;
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
		const fetchSession = async () => {
		  const { data } = await supabase.auth.getSession();
		  setSession(data.session);
		};
	
		fetchSession();
	
		const { data: authListener } = supabase.auth.onAuthStateChange(
		  (_event, newSession) => {
			setSession(newSession);
		  }
		);
	
		return () => {
		  authListener.subscription.unsubscribe();
		};
	  }, []);
	

	const login = async (payload: TLogin, redirectTo: string) => {
		const { email, password } = payload
		try {
			const { error } = await supabase.auth.signInWithPassword({ email, password })

			if(error) throw error

			window.location.href = redirectTo
		} catch (error) {
			console.error(error)
		}
	}

	const logout = async (redirectTo: string) => {

		try {
			const { error } = await supabase.auth.signOut()

			if(error) throw error

			if(redirectTo) window.location.href = redirectTo

			setSession(null)
		} catch (error) {
			console.error(error)
		}
	}

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
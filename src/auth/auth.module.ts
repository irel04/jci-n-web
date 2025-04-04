import { TAuth } from "@/types";
import { createContext, useContext } from "react";

export const AuthContext = createContext<TAuth>({
	login: async () => { },  // Empty function to avoid undefined
	logout: async () => { },
	session: null, 
	setSession: () => {}
});


export const useAuth = () => {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
};
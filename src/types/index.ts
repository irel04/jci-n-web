import { Session } from "@supabase/supabase-js";

export type TLogin = {
	email: string;
	password: string
}

export type TAuth = {
	login: (payload: TLogin) => Promise<void>;  // Always required
	logout: (redirectTo?: string) => Promise<void>;          // Always required
	session?: Session | null;
	setSession: React.Dispatch<React.SetStateAction<Session | null>>
};




export type TBaseProfile = {
	email_address: string,
	first_name: string;
	last_name: string;
	birthdate: string,
	phone_number: string,
	address: string,
	password?: string
}

export type TCompleteProfile = TBaseProfile & {
	id: string;
	lng?: number,
	lat?: number,
	created_at: string,
	auth_id: string,
	RFID?: string,
}
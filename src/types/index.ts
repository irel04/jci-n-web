import { Session } from "@supabase/supabase-js";

type TLogin = {
	email: string;
	password: string
}

type TAuth = {
	login: (payload: TLogin) => Promise<void>;  // Always required
	logout: (redirectTo?: string) => Promise<void>;          // Always required
	session?: Session| null;
	setSession: React.Dispatch<React.SetStateAction<Session | null | undefined>>
};


type TExtendedSession = Session & {
	is_admin?: boolean
}



type TBaseProfile = {
	email_address: string,
	first_name: string;
	last_name: string;
	birthdate: string,
	phone_number: string,
	address: string,
	password?: string
}

type TCompleteProfile = TBaseProfile & {
	id?: string;
	lng?: number,
	lat?: number,
	created_at?: string,
	auth_id?: string,
	RFID?: string,
	status?: string,
	personal_id?: string,
}


type TFaqs = {
	question: string,
	answer: string,
	id: string,
	created_at: string
}


export type { TLogin, TAuth, TBaseProfile, TCompleteProfile, TExtendedSession, TFaqs }
import { Session } from "@supabase/supabase-js";

export type TLogin = {
	email: string;
	password: string
}

export type TAuth = {
	login: (payload: TLogin, redirectTo:string) => Promise<void>;  // Always required
	logout: (redirectTo?: string) => Promise<void>;          // Always required
	session?: Session | null;
  };
  
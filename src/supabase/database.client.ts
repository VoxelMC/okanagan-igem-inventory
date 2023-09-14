"database:client";

import * as sb from '@supabase/supabase-js';
import type { Database } from "./database.types";

import { persistentMap } from '@nanostores/persistent';
import postgres from 'postgres';

export interface AuthTokenData {
	access_token: string;
	refresh_token: string;
	user: AuthTokenUser;
	token_type: string;
	expires_in: number;
	expires_at: number;
}

export interface AuthTokenUser {
	id: string;
	aud: string;
	role: string;
	email: string;
	email_confirmed_at: string;
	phone: string;
	confirmation_sent_at: string;
	confirmed_at: string;
	last_sign_in_at: string;
	app_metadata: AuthTokenAppMetadata;
	user_metadata: AuthTokenUserMetadata;
	identities: AuthTokenIdentity[];
	created_at: string;
	updated_at: string;
}

export interface AuthTokenAppMetadata {
	provider: string;
	providers: string[];
}

export interface AuthTokenUserMetadata {
	name: string;
	role: string;
}

export interface AuthTokenIdentity {
	id: string;
	user_id: string;
	identity_data: AuthTokenIdentityData;
	provider: string;
	last_sign_in_at: string;
	created_at: string;
	updated_at: string;
}

export interface AuthTokenIdentityData {
	email: string;
	sub: string;
}

export const $atomMap = persistentMap<{ [K: string]: any; }>(
	'atoms',
	{},
	{
		encode: JSON.parse,
		decode: JSON.stringify
	}
);

export function getAuthTokenFromStore(): AuthTokenData {
	return $atomMap.get()["sb-igeclytaunnqaysalyct-auth-token"];
}

const nanostoresAdapter: sb.SupportedStorage = {
	getItem: (key: string): string | null => $atomMap.get()[key as keyof object],
	setItem: (key: string, value: string): void => $atomMap.setKey(key, value),
	removeItem: (key: string): void => $atomMap.setKey(key, null),
};

const supabase: sb.SupabaseClient<any, "public", any> = sb.createClient<Database>(
	import.meta.env.SUPABASE_URL,
	import.meta.env.SUPABASE_ANON_KEY,
	{
		auth: {
			detectSessionInUrl: true,
			flowType: 'pkce',
			storage: nanostoresAdapter
		}
	}
);

export const sql = postgres(import.meta.env.SUPABASE_POSTGRES_CONNECTION_STRING, {
	transform: {
		...postgres.camel,
		undefined: null
	}
});

export default supabase;

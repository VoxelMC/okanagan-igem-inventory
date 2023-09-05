"database:client";

import * as sb from '@supabase/supabase-js';
import type { Database } from "./database.types";

import { persistentMap } from '@nanostores/persistent';
import postgres from 'postgres';

export const $atomMap = persistentMap<{ [K: string]: any; }>(
	'atoms',
	{},
	{
		encode: JSON.parse,
		decode: JSON.stringify
	}
);

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

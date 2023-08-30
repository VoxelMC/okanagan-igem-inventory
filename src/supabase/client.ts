import * as sb from '@supabase/supabase-js';
import type { Database } from "./database.types";

import { persistentMap } from '@nanostores/persistent';
import type { WritableAtom } from 'nanostores';

export const atoms: Map<string, WritableAtom<string>> = new Map();

export const atomMap = persistentMap<{ [K: string]: any; }>(
	'atoms',
	{},
	{
		encode: JSON.parse,
		decode: JSON.stringify
	}
);

const nanostoresAdapter: sb.SupportedStorage = {
	getItem: (key: string): string | null => atomMap.get()[key as keyof object],
	setItem: (key: string, value: string): void => {
		atomMap.setKey(key, value);
	},
	removeItem: (key: string): void => {
		atomMap.setKey(key, null);
	}
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

export default supabase;
import * as sb from '@supabase/supabase-js';
import type { Database } from "./database.types";

const customStorageAdapter: sb.SupportedStorage = {
	getItem: (key) => {
		return globalThis.localStorage.getItem(key);
	},
	setItem: (key, value) => {
		globalThis.localStorage.setItem(key, value);
	},
	removeItem: (key) => {
		globalThis.localStorage.removeItem(key);
	},
};

const supabase: sb.SupabaseClient<any, "public", any> = sb.createClient<Database>(
	import.meta.env.SUPABASE_URL,
	import.meta.env.SUPABASE_ANON_KEY,
	{
		auth: {
			detectSessionInUrl: true,
			flowType: 'pkce',
			storage: customStorageAdapter
		}
	}
);

export default supabase;
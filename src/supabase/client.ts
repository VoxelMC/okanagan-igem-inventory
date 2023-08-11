import * as sb from '@supabase/supabase-js';
import type { Database } from "./database.types";

const supabase: sb.SupabaseClient<any, "public", any> = sb.createClient<Database>(
	import.meta.env.SUPABASE_URL,
	import.meta.env.SUPABASE_ANON_KEY,
	{
		auth: {
			autoRefreshToken: false,
			persistSession: false,
			detectSessionInUrl: false
		}
	}
);

export default supabase;
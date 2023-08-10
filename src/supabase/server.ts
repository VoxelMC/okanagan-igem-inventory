import * as sb from '@supabase/supabase-js';

export const supabase: sb.SupabaseClient<any, "public", any> = sb.createClient(
	import.meta.env.SUPABASE_URL,
	import.meta.env.SUPABASE_ANON_KEY
);
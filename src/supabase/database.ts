import postgres from "postgres";

const sql = postgres(import.meta.env.SUPABASE_POSTGRES_CONNECTION_STRING);

export default sql;
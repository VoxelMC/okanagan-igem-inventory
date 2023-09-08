import supabase, { sql } from "database:client";
import type { Table } from "database:tables";
import type { Institution } from "database:types";

export async function getInstitutions(query?: string): Promise<Table<Institution>> {
	const res = await sql`SELECT * FROM public.institution ${!!query ? sql`WHERE id = ${query}` : sql``}` as Table<Institution>;
	return !!res.length ? res : [];
}

export function getIUIDFromUUID(uuid: string): string {
	return "institution_" + uuid.replaceAll("-", "_");
}
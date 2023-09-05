"database:functions";

import supabase, { sql } from "supabase/database.client";
import type { Table, Institution } from "database:tables";

async function getRoles(): Promise<Role[]> {
	const { data } = await supabase.rpc("getroles");
	return data;
}

export async function isRoleTokenValid(token: string): Promise<boolean> {
	return (await getRoles()).some(value => token === value.token);
}

export async function getRoleUUIDFromToken(token: string): Promise<string> {
	return (await getRoles()).find(value => token === value.token)!.uuid;
}

export function uuidToDUID(uuid: string) {
	return "domain_" + uuid.replaceAll("-", "_");
}

export async function getInstitutions(query?: string): Promise<Table<Institution>> {
	const res = await sql`SELECT * FROM public.institution ${!!query ? sql`WHERE id = ${query}` : sql``}` as Table<Institution>;
	return !!res.length ? res : [];
}

export type Role = {
	name: string, token: string, uuid: string;
};
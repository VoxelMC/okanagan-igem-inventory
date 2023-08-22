import supabase from "./client";

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


export type Role = {
	name: string, token: string, uuid: string;
};
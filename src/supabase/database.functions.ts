import supabase from "./client";

export async function isRoleTokenValid(token: string): Promise<boolean> {
	let roles = await getRoles();
	return roles.some(value => token === value.token);
}

export async function getRoleFromToken(token: string): Promise<string> {
	let roles = await getRoles();
	return roles.find(value => token === value.token)!.id;
}

export type Role = {
	name: string, token: string, id: string;
};

async function getRoles(): Promise<Role[]> {
	const { data } = await supabase.rpc("getroles");
	return data;
}
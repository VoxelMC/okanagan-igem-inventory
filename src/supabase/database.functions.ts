import supabase from "./client";

export async function getRoles(): Promise<Object> {
	const { data } = await supabase.from("roles").select("name, roletokens (token)");
	let out: Object = {};
	for (let value of data!.entries()) {
		out[value[1].name as keyof Object] = value[1].roletokens[0].token;
	}
	return out;
}
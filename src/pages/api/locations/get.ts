import type { APIContext } from "astro";
import supabase from "../../../supabase/database.client";
import type { LocationSchema } from "../../../util/types/schemas";
import { uuidToDUID } from "../../../supabase/database.functions";

type LocationResponseBody = {
	data: object[],
};

export async function POST({ request }: APIContext): Promise<Response> {
	const { data, error } = await supabase.auth.getSession();

	if (error) return new Response(JSON.stringify({ message: "This request is not authorized" }), { status: 401 });

	const targetDomainUUID = (await request.formData()).get("target") as string;

	let table = (await supabase.schema(uuidToDUID(targetDomainUUID)).from("domain_information").select("*"));

	let body: LocationResponseBody = {
		data: table.data as object[]
	};


	return new Response(JSON.stringify(targetDomainUUID), { status: 200 });
};
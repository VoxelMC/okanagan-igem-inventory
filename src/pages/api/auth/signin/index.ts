import type { APIRoute } from "astro";
import supabase from "../../../../supabase/client";

export const get: APIRoute = async ({ request, cookies, redirect }) => {
	const { data, error } = await supabase.auth.signInWithPassword({
		email: request.headers.get("email") || "",
		password: request.headers.get("password") || "",
	});

	// DEBUG
	console.log(`[DEBUG]\nDATA: ${data}\nERROR: ${error}`, data);

	if (error) {
		return new Response(`${error.name}\n${error.message}\n${error.cause}`);
	}

	const { access_token } = data.session;

	if (!access_token) {
		return new Response("[ERROR | SIGNIN]\nNO ACCESS TOKEN FOUND", { status: 401 });
	}

	// VERIFY ACCESS TOKEN
	try {
		await supabase.auth.getUser(access_token);
	} catch (error) {
		return new Response("[ERROR | SIGNIN]\nTOKEN FAILED VERIFICATION", { status: 401 });
	}

	// SET COOKIE VALUE AND EXPIRATION DATE
	let date = new Date();
	date.setDate(date.getDate() + 5);

	cookies.set("session_token", access_token, {
		path: "/",
		expires: date,
	});

	return redirect("/dashboard");
};

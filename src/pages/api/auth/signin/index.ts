import type { APIContext, APIRoute } from "astro";
import supabase from "../../../../supabase/client";

export async function get({ request, cookies, redirect }: APIContext): Promise<Response> {
    const { data, error } = await supabase.auth.signInWithPassword({
        email: request.headers.get("email") || "",
        password: request.headers.get("password") || "",
    });

    // DEBUG
    // console.log(`[DEBUG]\nDATA: ${data}\nERROR: ${error}`, data);

    if (error) {
        return new Response(JSON.stringify({ message: "[ERROR | SIGNIN]\nSIGN IN WITH PROVIDED CREDENTIALS FAILED" }), { status: 401 });
    }

    const { access_token: accessToken } = data.session;

    if (!accessToken) {
        return new Response(JSON.stringify({ message: "[ERROR | SIGNIN]\nNO ACCESS TOKEN FOUND" }), { status: 401 });
    }

    // VERIFY ACCESS TOKEN
    try {
        await supabase.auth.getUser(accessToken);
    } catch (error) {
        return new Response(JSON.stringify({ message: "[ERROR | SIGNIN]\nTOKEN FAILED VERIFICATION" }), { status: 401 });
    }

    // SET COOKIE VALUE AND EXPIRATION DATE
    let date = new Date();
    date.setDate(date.getDate() + 5);

    cookies.set("session_token", accessToken, {
        path: "/",
        expires: date,
    });

    return redirect("/dashboard");
};

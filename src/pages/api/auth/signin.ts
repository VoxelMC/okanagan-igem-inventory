import type { APIContext, APIRoute } from "astro";
import supabase from "../../../supabase/client";

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

    const accessToken = data.session.access_token;

    if (!accessToken) {
        return new Response(JSON.stringify({ message: "[ERROR | SIGNIN]\nNO ACCESS TOKEN FOUND" }), { status: 401 });
    }

    // VERIFY ACCESS TOKEN
    try {
        await supabase.auth.getUser(accessToken);
    } catch (error) {
        return new Response(JSON.stringify({ message: "[ERROR | SIGNIN]\nTOKEN FAILED VERIFICATION" }), { status: 401 });
    }

    try {
        const { data: setSesData } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: data.session.refresh_token,
        });
    } catch (error) { }
    return redirect("/dashboard");
}

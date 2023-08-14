import type { APIContext, APIRoute } from "astro";
import supabase from "../../../supabase/client";

export async function get({ request, cookies, redirect }: APIContext): Promise<Response> {
    const { data, error } = await supabase.auth.signInWithPassword({
        email: request.headers.get("email") || "",
        password: request.headers.get("password") || "",
    });

    console.log(data);


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

    // SET COOKIE VALUE AND EXPIRATION DATE
    let date = new Date();
    date.setDate(date.getDate() + 5);

    cookies.set("session_token", accessToken, {
        path: "/",
        expires: date,
    });
    cookies.set("refresh_token", data.session.refresh_token, {
        path: "/",
        expires: date,
    });
    try {
        const { data: setSesData } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: data.session.refresh_token,
        });
        console.log(setSesData);
    } catch (error) { }
    return redirect("/dashboard");
}

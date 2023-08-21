import type { APIRoute } from "astro";
import supabase from "../../../supabase/client";

export const get: APIRoute = async ({ redirect, cookies }) => {
    cookies.delete("session_token", {
        path: "/",
    });
    const { error } = await supabase.auth.signOut();
    if (error) {
        return new Response(JSON.stringify({ message: "[ERROR | SIGNOUT]\nSIGN OUT FAILED" }), { status: 401 });
    }
    return redirect("/signin");
};

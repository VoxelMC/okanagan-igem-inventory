import type { APIRoute } from "astro";
import supabase from "../../../supabase/client";

export const get: APIRoute = async ({ redirect, cookies }) => {
    const { error } = await supabase.auth.signOut();
    if (error) {
        return new Response(JSON.stringify({ message: "[ERROR | SIGNOUT]\nSIGN OUT FAILED" }), { status: 401 });
    }
    return redirect("/signin");
};

import type { APIRoute } from "astro";
import supabase from "../../../supabase/client";

export const get: APIRoute = async ({ redirect, cookies }) => {
    cookies.delete("session_token", {
        path: "/",
    });

    const { error } = await supabase.auth.signOut();
    return redirect("/signin");
};
import type { APIRoute } from "astro";
import supabase from "../../../supabase/client";

export const get: APIRoute = async ({ redirect, cookies }) => {
    const { error } = await supabase.auth.signOut();
    return redirect("/signin");
};
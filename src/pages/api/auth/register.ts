import type { APIRoute } from "astro";
import supabase from "../../../supabase/client";
import { getRoles } from "../../../supabase/database.functions";

export const post: APIRoute = async ({ request, redirect }) => {
    // GET FORM DATA
    const formData = await request.formData();
    const email = formData.get("email")?.toString();
    const password = formData.get("password")?.toString();
    const name = formData.get("name")?.toString();
    const roleToken = formData.get("roleToken")?.toString() || "voNbpVJldvyrLk";

    // RETURN IF MISSING FORM DATA
    if (!email || !password || !name) {
        return new Response(JSON.stringify({ message: "[ERROR | SIGNUP]\nMISSING FORM DATA" }), { status: 400 });
    }

    const roles: Object = await getRoles();
    const role = Object.keys(roles).find((key) => roles[key as keyof Object].toString() === roleToken);

    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                name,
                role,
            },
        },
    });

    if (error) {
        console.log(error);
        return new Response(JSON.stringify({ message: "[ERROR | SIGNUP]\nSIGN UP WITH PROVIDED CREDENTIALS FAILED" }), { status: 401 });
    }

    return redirect("/signin");
};

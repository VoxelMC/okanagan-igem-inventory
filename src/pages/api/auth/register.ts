import type { APIRoute } from "astro";
import supabase from "../../../supabase/database.client";
import { getRoleUUIDFromToken, isRoleTokenValid } from "../../../supabase/database.functions";

export const POST: APIRoute = async ({ request, redirect }) => {
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

    if (!isRoleTokenValid(roleToken)) return new Response(JSON.stringify({ message: "Invalid Role Token" }), { status: 401 });
    const role = getRoleUUIDFromToken(roleToken);

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
        return new Response(JSON.stringify({ message: "[ERROR | SIGNUP]\nSIGN UP WITH PROVIDED CREDENTIALS FAILED. Please contact the website administrator." }), { status: 401 });
    }

    return redirect("/signin");
};

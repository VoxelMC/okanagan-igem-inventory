import type { APIRoute } from "astro";
import supabase from "../../../supabase/client";
import type { IRoles } from "../../../util/types/roles";

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

    const roles: IRoles = {
        ADMIN: "voNbpVJldvyrLk",
        MEMBER: "Y1ad819dcWzMl7",
        VOLUNTEER: "WzIPWrwOXbRsk5",
    };

    const role = Object.keys(roles).find((key) => roles[key as keyof IRoles] === roleToken);

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

import type { APIRoute } from "astro";
import { getAuth } from "firebase-admin/auth";
import * as admin from "firebase-admin";
import { app } from "../../../../firebase/server";
import { getFirestore } from "firebase-admin/firestore";
import supabase from "../../../../supabase/client";

interface IRoles {
    Admin: string;
    Member: string;
    Volunteer: string;
}

export const post: APIRoute = async ({ request, redirect }) => {
    const auth = getAuth(app);

    // GET FORM DATA
    const formData = await request.formData();
    const email = formData.get("email")?.toString();
    const password = formData.get("password")?.toString();
    const name = formData.get("name")?.toString();
    const role = formData.get("roleToken")?.toString() || "voNbpVJldvyrLk";

    // RETURN IF MISSING FORM DATA
    if (!email || !password || !name) {
        return new Response(JSON.stringify({ message: "[ERROR | SIGNUP]\nMISSING FORM DATA" }), { status: 400 });
    }

    const roles = {
        ADMIN: "voNbpVJldvyrLk",
        MEMBER: "Y1ad819dcWzMl7",
        VOLUNTEER: "WzIPWrwOXbRsk5",
    };

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

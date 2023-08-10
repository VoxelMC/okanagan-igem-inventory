import type { APIRoute } from "astro";
import { app } from "../../../../firebase/server";
import { getAuth } from "firebase-admin/auth";
import supabase from "../../../../supabase/supabaseClient";

// export const get: APIRoute = async ({ request, cookies, redirect }) => {
//     const auth = getAuth(app);
//     /* Get token from request headers */

//     const { data, error } = await supabase.auth.signInWithPassword({
//         email: request.headers.get("Email") || "",
//         password: request.headers.get("Password") || "",
//     });

//     console.log(data, error);
//     // if (!idToken) {
//     //     return new Response("No token found", { status: 401 });
//     // }
//     // /* Verify id token */
//     // try {
//     //     await auth.verifyIdToken(idToken);
//     // } catch (error) {
//     //     return new Response("Invalid token", { status: 401 });
//     // }
//     // /* Create and set session cookie */
//     // const fiveDays = 60 * 60 * 24 * 5 * 1000;
//     // const sessionCookie = await auth.createSessionCookie(idToken, {
//     //     expiresIn: fiveDays,
//     // });
//     // cookies.set("session", sessionCookie, {
//     //     path: "/",
//     // });
//     // return redirect("/dashboard");
// };

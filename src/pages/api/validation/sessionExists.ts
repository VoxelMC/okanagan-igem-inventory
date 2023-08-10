import supabase from "../../../supabase/client";

export default async function sessionExists() {
    // GET SESSION TOKEN FROM COOKIES
    const sessionToken = Astro.cookies.get("session_token").value;

    // CHECK IF IT IS AN ACTIVE SESSION TOKEN
    const {
        data: { user },
    } = await supabase.auth.getUser(sessionToken);

    return user ? user : false;
}

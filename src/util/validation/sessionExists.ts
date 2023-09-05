import supabase from "../../supabase/database.client";

export default async function sessionExists(sessionToken: string): Promise<boolean> {
    // CHECK IF IT IS AN ACTIVE SESSION TOKEN
    const {
        data: { user },
    } = await supabase.auth.getUser(sessionToken);

    return !!user;
}

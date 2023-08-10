import { atom } from "nanostores";
import supabase from "../../../supabase/supabaseClient";

export const currentUser = atom(null);

export function isSignedIn() {
    if (currentUser.get()) return true;
    else return false;
}

/**
 * Checks if a user is logged in. If not, then logged in the given user.
 *
 * @param user The user to be logged in.
 * @returns Logs message to concole if a user is already logged in.
 */
export function signInUser(user) {
    if (!currentUser.get()) {
        currentUser.set(user);
        console.log("Logged in the following user: " + currentUser.get());
    } else console.log("[WARNING]\nAN USER IS CURRENTLY LOGGED IN.");
}

/**
 * Checks if a user is logged in and signs them out.
 *
 * @returns NULL if an error is encountered and the user cannot be logged out.
 * @returns Logs message to concole if no user is currently logged in.
 */
export async function signOutUser() {
    if (currentUser.get()) {
        let { error } = await supabase.auth.signOut();
        if (error) return error;
        else {
            currentUser.set(null);
            console.log("Logged out the user. Current user is: " + currentUser.get());
            return null;
        }
    } else console.log("[WARNING]\nNO USER IS CURRENTLY LOGGED IN.");
}

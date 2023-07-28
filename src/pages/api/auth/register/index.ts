import type { APIRoute } from "astro";
import { getAuth } from "firebase-admin/auth";
import * as admin from 'firebase-admin';
import { app } from "../../../../firebase/server";
import { getFirestore } from "firebase-admin/firestore";

interface IRoles {
	Admin: string,
	Member: string,
	Volunteer: string;
}

export const post: APIRoute = async ({ request, redirect }) => {
	const auth = getAuth(app);

	/* Get form data */
	const formData = await request.formData();
	const email = formData.get("email")?.toString();
	const password = formData.get("password")?.toString();
	const name = formData.get("name")?.toString();
	const roleToken = formData.get("roleToken")?.toString();

	if (!email || !password || !name || !roleToken) {
		return new Response(
			"Missing form data",
			{ status: 400 }
		);
	}

	/* Establish User's Role */
	const db = getFirestore(app);
	const rolesCollection = db.collection("Role Tokens");
	const rolesSnapshot = await rolesCollection.get();
	const roles = rolesSnapshot.docs.map((doc) => ({
		...doc.data(),
	}))[0] as IRoles;

	const role = Object.keys(roles).find((key) => roles[key as keyof IRoles] === roleToken);
	if (!role) return new Response("That is not a valid Role Token.", { status: 401 });

	let rolesObj = { [role]: true };

	/* Create user */
	try {
		const { uid } = await auth.createUser({
			email,
			password,
			displayName: name,
		});
		await auth.setCustomUserClaims(uid, { [role]: true });
	} catch (error: any) {
		return new Response(
			"Something went wrong",
			{ status: 400 }
		);
	}
	return redirect("/signin");
};
import type { APIRoute } from "astro";
import { app } from "../../../firebase/server";
import { getFirestore } from "firebase-admin/firestore";
import { LocationType, type NewLocationSchema } from "../../../types/schemas";

export const post: APIRoute = async ({ request, redirect }) => {
	const formData = await request.formData();

	const name = formData.get("name")?.toString();
	const description = formData.get("description")?.toString();
	const parents = formData.get("parents")?.toString();
	const children = formData.get("children")?.toString();
	const type = formData.get("type")?.toString();
	const color = formData.get("color")?.toString();


	if (!name || !description || !parents || !children || !type || !color) {
		return new Response("Missing required fields", {
			status: 400,
		});
	}
	try {
		const db = getFirestore(app);
		const friendsRef = db.collection("locations");

		let newLocation: NewLocationSchema = {
			name: name,
			description: description,
			parents: [],
			children: [],
			color: color,
			type: LocationType.BOX
		};

		await friendsRef.add(newLocation);
	} catch (error) {
		return new Response("Something went wrong", {
			status: 500,
		});
	}
	return redirect("/dashboard");
};
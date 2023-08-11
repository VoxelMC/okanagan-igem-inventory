import type { APIRoute } from "astro";
import { app } from "../../../firebase/server";
import { getFirestore } from "firebase-admin/firestore";
import { LocationType, NoneLocationType, type NewLocationSchema } from "../../../util/types/schemas";

export const post: APIRoute = async ({ request, redirect }) => {
	const formData = await request.formData();


	const name = formData.get("name")?.toString();
	const description = formData.get("description")?.toString();
	const parent = formData.get("parent-id")?.toString();
	const children = formData.getAll("children-ids") as string[];
	const type = formData.get("type")?.toString();
	const color = formData.get("color")?.toString();


	if (!name || !description || !parent || !children || !type || !color) {
		let jsonRes: NewLocationSchema = {
			name: name as string,
			description: description as string,
			parent: parent as string,
			children: children,
			color: color as string,
			type: NoneLocationType.NONE,
		};
		// formData.forEach((value: any, key: string) => jsonRes[key as keyof NewLocationSchema] = value);

		let stringRes = JSON.stringify(jsonRes, null, 4);

		return new Response(stringRes, {
			status: 400,
		});
	}
	try {
		const db = getFirestore(app);
		const friendsRef = db.collection("locations");

		let newLocation: NewLocationSchema = {
			name: name,
			description: description,
			parent: parent,
			children: [],
			color: color,
			type: type as LocationType
		};

		await friendsRef.add(newLocation);
	} catch (error) {
		return new Response("Something went wrong", {
			status: 500,
		});
	}
	return redirect("/dashboard");
};
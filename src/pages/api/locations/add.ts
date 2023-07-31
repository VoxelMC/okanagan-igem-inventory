// import type { APIRoute } from "astro";
// import { app } from "../../../firebase/server";
// import { getFirestore } from "firebase-admin/firestore";
// import type { NewLocationSchema } from "../../../types/schemas";

// export const post: APIRoute = async ({ request, redirect }) => {
// 	const formData = await request.formData();
// 	const name = formData.get("name")?.toString();
// 	const description = formData.get("age")?.toString();
// 	const parents = formData.get("name")?.toString();
// 	const age = formData.get("age")?.toString();
// 	const name = formData.get("name")?.toString();
// 	const age = formData.get("age")?.toString();


// 	if (!name || !age) {
// 		return new Response("Missing required fields", {
// 			status: 400,
// 		});
// 	}
// 	try {
// 		const db = getFirestore(app);
// 		const friendsRef = db.collection("locations");

// 		let newLocation: NewLocationSchema = {

// 		};



// 		await friendsRef.add({
// 			name,
// 			age: parseInt(age),
// 			isBestFriend,
// 			test: [
// 				{
// 					name,
// 					age: parseInt(age),
// 					isBestFriend
// 				}
// 			]
// 		});
// 	} catch (error) {
// 		return new Response("Something went wrong", {
// 			status: 500,
// 		});
// 	}
// 	return redirect("/dashboard");
// };
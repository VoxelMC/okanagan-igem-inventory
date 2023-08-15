import type { APIContext, APIRoute } from "astro";
import { getFirestore } from "firebase-admin/firestore";
import { app } from "../../../firebase/server";
import { initElement } from "../../../util/dom";

interface Friend {
	id: string;
	name: string;
	age: number;
	isBestFriend: boolean;
}

const db = getFirestore(app);
const friendsRef = db.collection("data");
const friendsSnapshot = await friendsRef.get();
const friends = friendsSnapshot.docs.map(doc => ({
	id: doc.id,
	...doc.data(),
})) as Friend[];

export async function get({ request, redirect, cookies }: APIContext<Record<string, any>>): Promise<Response> {
	let outputElement: HTMLTableElement = initElement("table");
	let tableHeaders = Object.keys(friends[0]);

	let tableHead: HTMLTableSectionElement = initElement("thead");
	for (let header of tableHeaders) {
		let headerEl: HTMLTableCellElement = initElement("th", header.toString());
		tableHead.appendChild(headerEl);
	}

	let tableBody: HTMLTableSectionElement = initElement("tbody");
	for (let friend of friends) {
		let row: HTMLTableRowElement = initElement("tr", "", { classes: "hover:bg-slate-100 cursor-default" });

		for (let col in friend) {
			let colEl = initElement("td", friend[col as keyof Friend].toString());
			row.appendChild(colEl);
		}
		tableBody.appendChild(row);
	}

	outputElement.append(tableHead, tableBody);

	return new Response(outputElement.innerHTML, { status: 200 });
}


export async function post({ request, redirect, cookies }: APIContext<Record<string, any>>): Promise<Response> {
	let data = (await request.formData()).get("ASDF");
	return new Response(`<b>${data}</b>`);
}
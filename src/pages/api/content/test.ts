import type { APIContext, APIRoute } from "astro";
import { initElement } from "../../../util/dom";

interface Friend {
	id: string;
	name: string;
	age: number;
	isBestFriend: boolean;
}

const friends = [{ id: "1", name: "test", age: 100, isBestFriend: false } as Friend];

export async function get(): Promise<Response> {
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

export async function POST({ request }: APIContext<Record<string, any>>): Promise<Response> {
	let data = (await request.formData()).get("target") as FormDataEntryValue;
	return new Response(`<p><b>${data.toString()}</b></p>`, { headers: { "Content-Type": "text/html; charset=utf-8" } });
}
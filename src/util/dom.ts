import { JSDOM } from "jsdom";
const { window: { document: doc } } = new JSDOM(``);

export type HTMLAttributeOptions = {
	classes?: string;
};

export function initElement<K extends keyof HTMLElementTagNameMap>(tagName: K, innerText?: string, options?: HTMLAttributeOptions): HTMLElementTagNameMap[K] {
	let outputElement = doc.createElement(tagName);
	outputElement.textContent = innerText ?? "";
	if (!!options) outputElement.classList.add(...(options.classes?.trim().split(" ") as string[]));
	return outputElement;
}
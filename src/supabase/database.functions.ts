"database:functions";

export * from "./functions/database.user";
export * from "./functions/database.domain";
export * from "./functions/database.institution";

/**
 * Turns a string into a standardized URL-ready string.
 * @param s Text to URLify
 * @returns string 
 */
export function urlify(s: string) {
	return s.toLowerCase().replaceAll(/(%|{|}|\||\\|\^|~|\[|\]|`| )/gm, "-").replaceAll(/(-{2,}|-$})/gm, "-");
}
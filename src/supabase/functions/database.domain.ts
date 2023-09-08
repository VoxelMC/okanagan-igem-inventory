
export function uuidToDUID(uuid: string) {
	return "domain_" + uuid.replaceAll("-", "_");
}
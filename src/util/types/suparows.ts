

export class Table<T> extends Array<T> {
	constructor() {
		super();
	}
}

export interface EmployeeRow {
	id: string;
	name: string;
	role: string;
	levelOfEducation: string;
	onboarded: boolean;
}
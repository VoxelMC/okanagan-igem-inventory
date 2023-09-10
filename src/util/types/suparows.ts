

export class Table<T> extends Array<T> {
	constructor(iterable: Iterable<T>) {
		super();
		for (let i of iterable) {
			this.push(i);
		}
	}
}

export interface EmployeeRow {
	id: string;
	name: string;
	role: string;
	levelOfEducation: string;
	onboarded: boolean;
}

export interface EmployeeDomainJointRow {
	employeeId: string;
	employeeName: string;
	levelOfEducation: string;
	employeeRole: string;
	employeeJoinedAt: string;
	domainId: string;
	domainInstitution: string;
	domainName: string;
	domainDescription: string;
	domainPrincipalInvestigator: string;
	domainDuid: string;
	domaincreatedat: string;
}
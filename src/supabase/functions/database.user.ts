import supabase, { sql } from "database:client";
import type { Institution, Employee, EducationLevel, InstitutionRole, Domain } from "database:types";
import { Table } from "database:tables";
import type { EmployeeDomainJointRow, EmployeeRow } from "database:tables";
import { getIUIDFromUUID } from "./database.institution";

export type Role = {
	name: string, token: string, uuid: string;
};

async function getRoles(): Promise<Role[]> {
	const { data } = await supabase.rpc("getroles");
	return data;
}

export async function isRoleTokenValid(token: string): Promise<boolean> {
	return (await getRoles()).some(value => token === value.token);
}

export async function getRoleUUIDFromToken(token: string): Promise<string> {
	return (await getRoles()).find(value => token === value.token)!.uuid;
}

export async function employeeFromUUID(institutionUUID: string, uuid: string): Promise<Employee> {
	const iuid = getIUIDFromUUID(institutionUUID);
	let employeeTable: Table<EmployeeRow> = await sql`SELECT * FROM ${sql(iuid + ".employee")} WHERE id = ${uuid}`;

	const employee: EmployeeRow = employeeTable[0];
	const role: InstitutionRole = (await sql`SELECT * FROM ${sql(iuid + ".institution_role")} WHERE id = ${employee.role}`)[0] as InstitutionRole;
	const education: EducationLevel = (await sql`SELECT * FROM ${sql("public.level_of_education")} WHERE id = ${employee.levelOfEducation}`)[0] as EducationLevel;

	return {
		id: uuid,
		name: employee.name,
		role: role,
		education: education,
		onboarded: employee.onboarded
	} as Employee;
}

export async function getEmployeeDomainsFromUUID(institutionUUID: string, uuid: string): Promise<{ employee: Employee, domains: Table<Domain>; }> {
	const iuid: string = getIUIDFromUUID(institutionUUID);

	const data: Table<EmployeeDomainJointRow> = (await sql`SELECT * FROM ${sql(iuid)}.employeeDomain WHERE employee_id = ${uuid};`);
	const emp: EmployeeDomainJointRow = data[0];

	const employee: Employee = {
		id: emp.employeeId,
		name: emp.employeeName,
		role: (await sql`SELECT * FROM ${sql(iuid + ".institution_role")} WHERE id = ${emp.employeeRole}`)[0] as InstitutionRole,
		education: (await sql`SELECT * FROM ${sql("public.level_of_education")} WHERE id = ${emp.levelOfEducation}`)[0] as EducationLevel,
		onboarded: false
	};

	const domains: Table<Domain> = [];

	for (let row of data) {
		domains.push({
			id: row.domainId,
			institution: (await sql`SELECT * FROM public.institution WHERE id = ${row.domainInstitution}`)[0] as Institution,
			name: row.domainName,
			description: row.domainDescription,
			pi: (await sql`SELECT * FROM ${sql(iuid + ".employee")} WHERE id = ${row.domainPrincipalInvestigator}`)[0] as Employee,
			duid: row.domainDuid,
			createdAt: row.domaincreatedat
		} as Domain);
	}
	return { employee, domains };
}
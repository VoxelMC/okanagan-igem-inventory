import supabase, { sql } from "database:client";
import type { Table, Institution, Employee, EmployeeRow, EducationLevel, InstitutionRole } from "database:tables";
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
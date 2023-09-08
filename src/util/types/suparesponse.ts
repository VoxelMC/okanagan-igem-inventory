"database:types";

import type { Table } from "database:tables";

//////////////////
export type PublicTable<
	T extends Institution | EmailDomain | LocationType | Unit | EducationLevel | RecordType
> = Table<T>;

export interface DomainTableInfo {
	duid: string;
}

export interface Institution {
	id: string;
	name: string;
	institutionOwner: string;
	iuid: string;
	createdAt: string;
}

export interface EmailDomain {
	id: string;
	institutionID: string;
	domain: string;
}

export interface LocationType {
	id: string;
	name: string;
}

export interface Unit {
	id: string;
	name: string;
	baseUnit: string;
}

export interface EducationLevel {
	id: string;
	name: string;
}

export interface RecordType {
	id: string;
	name: string;
}

//////////////////
export type InstitutionTable = Table<Institution>;

export interface InstitutionInfo {
	id: string;
	name: string;
	institutionOwner: string;
	createdAt: string;
}

export interface InstitutionRole {
	id: string;
	name: string;
}

export interface DomainRole {
	id: string;
	name: string;
}

export interface Employee {
	id: string;
	name: string;
	role: InstitutionRole;
	education: EducationLevel;
	onboarded: boolean;
}

export interface Domain {
	id: string;
	institution: Institution;
	name: string;
	description: string;
	pi: Employee;
	duid: string;
	createdAt: string;
}

export interface DomainClaim {
	id: string;
	token: string;
	expireAt: string;
}

export interface DomainEmployee {
	id: string;
	employee: Employee;
	domain: Domain;
	role: DomainRole;
	joinedAt: string;
}

export interface Location {
	id: string;
	domain: Domain;
	name: string;
	description: string;
	parent: Location;
	subcategory: LocationSubcategory;
	color: string;
}

export interface LocationSubcategory {
	id: string;
	name: string;
	scope: LocationType;
}

export interface EmailSubdomain {
	id: string;
	subdomain: string;
	role: InstitutionRole;
}

export interface Item {
	id: string;
	name: string;
	description: string;
	availableQuantity: number;
	location: Location;
	isShareable: boolean;
	shareUnit?: Unit;
	shareQuantity?: number;
}

export interface Equipment {
	id: string;
	name: string;
	description: string;
	location: Location;
	isAvailable: boolean;
	isShareable: boolean;
}

export interface RecordLog {
	id: string;
	recordType: RecordType;
	domain: Domain;
}

export interface Transaction {
	id: string;
	name: string;
	record: RecordLog;
}

export interface TransactionItem {
	transaction: Transaction;
	item: Item;
	isGhost: boolean;
	quantityWithdrawn: number;
	withdrawnUnit: Unit;
	quantityUsed: number;
	usedUnit: Unit;
}

export interface TransferType {
	id: string;
	name: string;
}

export interface Transfer {
	id: string;
	record: RecordLog;
	transferType: TransferType;
	authorized: boolean;
	authorizedAt: string;
}

export interface ItemTransfer {
	transfer: Transfer;
	item: Item;
	quantityTransferred: number;
	unit: Unit;
	toLocation: Location;
}

export interface EquipmentTransfer {
	transfer: Transfer;
	equipment: Equipment;
	unit: Unit;
	toLocation: Location;
	start: string;
	end: string;
}

export interface Booking {
	id: string;
	record: RecordLog;
	equipment: Equipment;
	start: string;
	end: string;
	reservedBy: Employee;
}

//////////////////
export type DomainTable = Table<Institution>;

export interface DomainInformation {
	domain: Domain;
	institution: Institution;
	name: string;
	description: string;
	pi: Employee;
	duid: string;
	createdAt: string;
}

export interface DomainAnnouncement {
	id: string;
	postedBy: Employee;
	title: string;
	message: string;
	createdAt: string;
}
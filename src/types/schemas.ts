export type NewLocationSchema = {
	name: string;
	description: string;
	parents: NewLocationSchema[];
	children: NewLocationSchema[];
	color: string;
	type: LocationType;
};


export type LocationSchema = {
	id: string;
	name: string;
	description: string;
	parents: NewLocationSchema[];
	children: NewLocationSchema[];
	color: string;
	type: LocationType;
};

export enum LocationType {
	ROOM = "room",
	FRIDGE = "fridge",
	FREEZER = "freezer",
	DEEP_FREEZER = "deep freezer",
	BOX = "box",
	RACK = "rack"
}
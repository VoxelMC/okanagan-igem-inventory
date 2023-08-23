export type NewLocationSchema = Omit<LocationSchema, "id">;

export type LocationSchema = {
    id: string;
    name: string;
    description: string;
    parent: string;
    children: string[];
    color: string;
    type: LocationType;
};

export enum LocationType {
    ROOM = "room",
    FRIDGE = "fridge",
    FREEZER = "freezer",
    DEEP_FREEZER = "deep freezer",
    BOX = "box",
    RACK = "rack",
}

export enum NoneLocationType {
    NONE = "none",
}

export type ILocationType = LocationType | NoneLocationType;

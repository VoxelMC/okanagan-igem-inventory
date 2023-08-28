export type Prettify<T> = {
    [K in keyof T]: T[K];
} & {};

export type NewLocationSchema = Prettify<
    Omit<LocationSchema, "id" | "type">
    & {
        type: ILocationType;
    }
>;

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

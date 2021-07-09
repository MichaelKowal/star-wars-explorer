export const apiType = [
    "films",
    "people",
    "planets",
    "species",
    "starships",
    "vehicles"
] as const;

export type Page = "home" | "search" | typeof apiType[number];

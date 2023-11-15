import { writable } from "svelte/store";

export enum IslandType {
    None,
    Utility,
    Expanded,
    Player,
}

export const islandState = writable<IslandType>(IslandType.None);

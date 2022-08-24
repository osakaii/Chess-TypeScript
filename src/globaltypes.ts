import { castles } from "./store/reducers/GameSlice";

export type boardMatrix = string[][];

export interface position {
    x: number;
    y: number;
}

export interface move {
    x: number;
    y: number;
    castle: keyof castles;
}

export interface ShadowedProps {
    posX: number;
    posY: number;
}

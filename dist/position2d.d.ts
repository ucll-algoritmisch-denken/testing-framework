import { Direction2D } from "./direction2d";
export declare class Position2D {
    readonly x: number;
    readonly y: number;
    constructor(x: number, y: number);
    add(direction: Direction2D): Position2D;
    readonly around4: Position2D[];
    readonly around8: Position2D[];
    touches4(p: Position2D): boolean;
    touches8(p: Position2D): boolean;
}

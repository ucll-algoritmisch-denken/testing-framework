import { Cell } from './cell';
import { Position } from "js-algorithms";
export declare class World {
    private readonly grid;
    constructor(width: number, height: number, initializer: (p: Position) => Cell);
    at(position: Position): Cell;
    readonly width: number;
    readonly height: number;
    isValidPosition(position: Position): boolean;
}

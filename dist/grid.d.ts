import { Position2D } from "./position2d";
export declare class Grid<T> {
    width: number;
    height: number;
    private items;
    constructor(width: number, height: number, initializer: (p: Position2D) => T);
    at(position: Position2D): T;
    row(rowIndex: number): T[];
    column(columnIndex: number): T[];
    readonly positions: Position2D[];
    isInside(position: Position2D): boolean;
    toColumnArray(): T[][];
    toRowArray(): T[][];
    findPositions(predicate: (t: T) => boolean): Position2D[];
    map<U>(f: (t: T) => U): Grid<U>;
    equal<U>(grid: Grid<U>, comparer: (t: T, u: U) => boolean): boolean;
    deepCopy(): Grid<T>;
    around4(position: Position2D): Position2D[];
    around8(position: Position2D): Position2D[];
}

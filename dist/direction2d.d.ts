export declare class Direction2D {
    readonly dx: number;
    readonly dy: number;
    constructor(dx: number, dy: number);
    rotateCW(): Direction2D;
    rotateCCW(): Direction2D;
    readonly angleInDegrees: number;
}

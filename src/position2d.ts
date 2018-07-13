import { Direction2D } from "direction2d";


export class Position2D
{
    constructor(public readonly x : number, public readonly y : number) { }

    add(direction : Direction2D) : Position2D
    {
        return new Position2D(this.x + direction.dx, this.y + direction.dy);
    }
}

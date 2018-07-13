import { Position2D } from "../position2d";
import { Direction2D } from "../direction2d";


export class CarState
{
    constructor(public readonly position : Position2D, public readonly direction : Direction2D) { }
}

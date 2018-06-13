export class Direction2D
{
    constructor(public readonly dx : number, public readonly dy : number) { }

    rotateCW() : Direction2D
    {
        return new Direction2D(this.dy, -this.dx);
    }

    rotateCCW() : Direction2D
    {
        return new Direction2D(-this.dy, this.dx);
    }

    get angleInDegrees() : number
    {
        return Math.atan2(this.dy, this.dx) * 180 / Math.PI;
    }
}

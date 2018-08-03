import { Direction2D } from "./direction2d";


export class Position2D
{
    constructor(public readonly x : number, public readonly y : number) { }

    add(direction : Direction2D) : Position2D
    {
        return new Position2D(this.x + direction.dx, this.y + direction.dy);
    }

    get around4() : Position2D[]
    {
        const result = new Array<Position2D>(4);

        result[0] = new Position2D(this.x - 1, this.y);
        result[1] = new Position2D(this.x + 1, this.y);
        result[2] = new Position2D(this.x, this.y - 1);
        result[3] = new Position2D(this.x, this.y + 1);

        return result;
    }

    get around8() : Position2D[]
    {
        const result = new Array<Position2D>(8);

        result[0] = new Position2D(this.x + 1, this.y);
        result[1] = new Position2D(this.x + 1, this.y + 1);
        result[2] = new Position2D(this.x, this.y + 1);
        result[3] = new Position2D(this.x - 1, this.y + 1);
        result[4] = new Position2D(this.x - 1, this.y);
        result[5] = new Position2D(this.x - 1, this.y - 1);
        result[6] = new Position2D(this.x, this.y - 1);
        result[7] = new Position2D(this.x + 1, this.y - 1);

        return result;
    }

    touches4(p : Position2D) : boolean
    {
        const dx = Math.abs(this.x - p.x);
        const dy = Math.abs(this.y - p.y);

        return (dx === 1 && dy === 0) || (dx === 0 && dy === 1);
    }

    touches8(p : Position2D) : boolean
    {
        const dx = Math.abs(this.x - p.x);
        const dy = Math.abs(this.y - p.y);

        return (dx === 0 || dx === 1) && (dy === 0 || dy === 1) && (dx !== 0 || dy !== 0);
    }
}

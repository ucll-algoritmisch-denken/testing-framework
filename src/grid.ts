import { Position2D } from "position2d";


export class Grid<T>
{
    private items : T[][];

    constructor(public width : number, public height : number, initializer : (p : Position2D) => T)
    {
        this.items = new Array<T[]>(height);

        for ( let y = 0; y !== height; ++y )
        {
            this.items[y] = new Array<T>(width);

            for ( let x = 0; x !== width; ++x )
            {
                const position = new Position2D(x, y);

                this.items[y][x] = initializer(position);
            }
        }
    }

    at(position : Position2D) : T
    {
        return this.items[position.y][position.x];
    }
}
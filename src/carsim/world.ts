import { Grid } from '../grid';
import { Cell } from './cell';
import { Position2D } from "../position2d";



export class World
{
    private readonly grid : Grid<Cell>;

    constructor(width : number, height : number, initializer : (p : Position2D) => Cell)
    {
        this.grid = new Grid<Cell>(width, height, initializer);
    }

    at(position : Position2D) : Cell
    {
        return this.grid.at(position);
    }

    get width() : number
    {
        return this.grid.width;
    }

    get height() : number
    {
        return this.grid.height;
    }

    isValidPosition(position : Position2D) : boolean
    {
        return 0 <= position.x && position.x < this.width && 0 <= position.y && position.y < this.height;
    }
}
import { Cell } from './cell';
import { createGrid, Grid, Position } from "js-algorithms";



export class World
{
    private readonly grid : Grid<Cell>;

    constructor(width : number, height : number, initializer : (p : Position) => Cell)
    {
        this.grid = createGrid<Cell>(width, height, initializer);
    }

    at(position : Position) : Cell
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

    isValidPosition(position : Position) : boolean
    {
        return 0 <= position.x && position.x < this.width && 0 <= position.y && position.y < this.height;
    }
}
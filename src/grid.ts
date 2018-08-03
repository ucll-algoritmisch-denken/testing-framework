import { Position2D } from "./position2d";
import * as _ from 'lodash';


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

    public at(position : Position2D) : T
    {
        return this.items[position.y][position.x];
    }

    public row(rowIndex : number) : T[]
    {
        if ( rowIndex >= this.height )
        {
            throw new Error(`rowIndex out of range`);
        }
        else
        {
            return _.range(0, this.width).map(columnIndex => this.at(new Position2D(columnIndex, rowIndex)));
        }
    }

    public column(columnIndex : number) : T[]
    {
        if ( columnIndex >= this.width )
        {
            throw new Error(`columnIndex out of range`);
        }
        else
        {
            return _.range(0, this.height).map(rowIndex => this.at(new Position2D(columnIndex, rowIndex)));
        }
    }

    get positions() : Position2D[]
    {
        const result = new Array<Position2D>(this.width * this.height);
        let i = 0;
        
        for ( let y = 0; y !== this.height; ++y )
        {
            for ( let x = 0; x !== this.width; ++x )
            {
                const position = new Position2D(x, y);
                result[i] = position;

                i++;
            }
        }

        return result;
    }

    public isInside(position : Position2D) : boolean
    {
        return 0 <= position.x && position.x < this.width && 0 <= position.y && position.y < this.height;
    }

    public toColumnArray() : T[][]
    {
        return _.range(0, this.width).map(x => this.column(x));
    }

    public toRowArray() : T[][]
    {
        return _.range(0, this.height).map(y => this.row(y));
    }

    public findPositions(predicate : (t : T) => boolean) : Position2D[]
    {
        return _.filter(this.positions, (p : Position2D) => predicate(this.at(p)));
    }

    public map<U>(f : (t : T) => U) : Grid<U>
    {
        return new Grid(this.width, this.height, p => f(this.at(p)));
    }

    public equal<U>(grid : Grid<U>, comparer : (t : T, u : U) => boolean) : boolean
    {
        if ( this.width !== grid.width || this.height !== grid.height )
        {
            return false;
        }
        else
        {
            return _.every( this.positions, p => comparer( this.at(p), grid.at(p) ) );
        }
    }

    public deepCopy() : Grid<T>
    {
        return new Grid<T>(this.width, this.height, p => _.cloneDeep(this.at(p)));
    }

    public around4(position : Position2D) : Position2D[]
    {
        return _.filter(position.around4, p => this.isInside(p));
    }

    public around8(position : Position2D) : Position2D[]
    {
        return _.filter(position.around8, p => this.isInside(p));
    }
}
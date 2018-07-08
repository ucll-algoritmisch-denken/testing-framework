import React from 'react';
import { Exercise as BaseExercise } from "../exercise";
import _ from 'lodash';
import { ValidatedInput } from 'components';


export interface IColumn<COLUMN, INPUT>
{
    name : COLUMN;

    header : JSX.Element;

    validate(data : INPUT, value : string) : boolean;

    render(data : INPUT) : JSX.Element;
}

export interface IRow<COLUMN, INPUT>
{
    data : INPUT;

    blankColumns : COLUMN[];
}

export abstract class Exercise<COLUMN, INPUT> extends BaseExercise
{
    // Cache for generateColumns()
    private __columns ?: IColumn<COLUMN, INPUT>[];

    protected abstract generateColumns() : Iterable<IColumn<COLUMN, INPUT>>;

    protected abstract generateRows() : Iterable<IRow<COLUMN, INPUT>>;

    protected get columns() : IColumn<COLUMN, INPUT>[]
    {
        if ( this.__columns )
        {
            return this.__columns;
        }
        else
        {
            this.__columns = Array.from(this.generateColumns());

            if ( this.__columns.length === 0 )
            {
                throw new Error(`Missing columns`);
            }
            else
            {
                return this.__columns;
            }
        }
    }

    protected get headers() : JSX.Element[]
    {
        return this.columns.map( column => column.header );
    }

    protected *renderRows() : Iterable<JSX.Element[]>
    {
        for ( let row of this.generateRows() )
        {
            yield this.renderRow(row);
        }
    }

    protected renderRow(row : IRow<COLUMN, INPUT>) : JSX.Element[]
    {
        return this.columns.map( column => this.renderCell(row, column) );
    }

    protected renderCell(row : IRow<COLUMN, INPUT>, column : IColumn<COLUMN, INPUT>) : JSX.Element
    {
        if ( _.includes(row.blankColumns, column.name) )
        {
            return this.renderBlankCell(row, column);
        }
        else
        {
            return this.renderVisibleCell(row, column);
        }
    }

    protected renderBlankCell(row : IRow<COLUMN, INPUT>, column : IColumn<COLUMN, INPUT>) : JSX.Element
    {
        return (
            <ValidatedInput validator={(x) => column.validate(row.data, x)} />
        );
    }

    protected renderVisibleCell(row : IRow<COLUMN, INPUT>, column : IColumn<COLUMN, INPUT>) : JSX.Element
    {
        return column.render(row.data);
    }
}
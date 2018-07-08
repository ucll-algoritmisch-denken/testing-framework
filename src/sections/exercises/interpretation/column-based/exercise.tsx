import React from 'react';
import { Exercise as BaseExercise } from "../../exercise";
// import { Exercise as BaseExercise } from "../exercise";
import _ from 'lodash';
import { ValidatedInput } from 'components';
import { ColumnBasedForm } from 'components/column-based-form';
import { Lazy } from '../../../../lazy';
import { DescriptionBox } from '../../../../components/description-box';


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
    protected abstract readonly description : JSX.Element;

    protected abstract generateColumns() : Iterable<IColumn<COLUMN, INPUT>>;
    
    protected abstract generateRows() : Iterable<IRow<COLUMN, INPUT>>;

    private readonly __columns : Lazy<IColumn<COLUMN, INPUT>[]>;

    private readonly __columnBasedRows : Lazy<IRow<COLUMN, INPUT>[]>;

    constructor()
    {
        super();

        this.__columns = new Lazy( () => {
            const result = Array.from(this.generateColumns());

            if ( result.length === 0 )
            {
                throw new Error(`Missing columns`);
            }
            else
            {
                return result;
            }
        } );

        this.__columnBasedRows = new Lazy( () => {
            const result = Array.from(this.generateRows());

            if ( result.length === 0 )
            {
                throw new Error(`Missing rows`);
            }
            else
            {
                return result;
            }
        } );
    }

    protected get htmlClasses() : string[]
    {
        return super.htmlClasses.concat( 'interpretation' );
    }

    protected get exerciseContent() : JSX.Element
    {
        return (
            <React.Fragment>
                <DescriptionBox>
                    {this.description}
                </DescriptionBox>
                {this.renderForm()}
            </React.Fragment>
        );
    }

    protected renderForm() : JSX.Element
    {
        class Form extends ColumnBasedForm<COLUMN, INPUT> { }

        return (
            <Form className="interpretation-form" columns={this.__columns.value} rows={this.__columnBasedRows.value} />
        );
    }

    // protected get headers() : JSX.Element[]
    // {
    //     return this.__columns.value.map( column => column.header );
    // }

    // protected *renderRows() : Iterable<JSX.Element[]>
    // {
    //     for ( let row of this.generateRows() )
    //     {
    //         yield this.renderRow(row);
    //     }
    // }

    // protected renderRow(row : IRow<COLUMN, INPUT>) : JSX.Element[]
    // {
    //     return this.columns.map( column => this.renderCell(row, column) );
    // }

    // protected renderCell(row : IRow<COLUMN, INPUT>, column : IColumn<COLUMN, INPUT>) : JSX.Element
    // {
    //     if ( _.includes(row.blankColumns, column.name) )
    //     {
    //         return this.renderBlankCell(row, column);
    //     }
    //     else
    //     {
    //         return this.renderVisibleCell(row, column);
    //     }
    // }

    // protected renderBlankCell(row : IRow<COLUMN, INPUT>, column : IColumn<COLUMN, INPUT>) : JSX.Element
    // {
    //     return (
    //         <ValidatedInput validator={(x) => column.validate(row.data, x)} />
    //     );
    // }

    // protected renderVisibleCell(row : IRow<COLUMN, INPUT>, column : IColumn<COLUMN, INPUT>) : JSX.Element
    // {
    //     return column.render(row.data);
    // }
}
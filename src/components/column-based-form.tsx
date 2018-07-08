import React from 'react';
import { Form } from './form';
import { ValidatedInput } from './validated-input';
import _ from 'lodash';


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

export interface IProps<COLUMN, INPUT>
{
    className ?: string;

    columns : IColumn<COLUMN, INPUT>[];

    rows: IRow<COLUMN, INPUT>[];
}

export interface IState
{
    
}

export class ColumnBasedForm<COLUMN, INPUT> extends React.Component<IProps<COLUMN, INPUT>, IState>
{
    constructor(props : IProps<COLUMN, INPUT>)
    {
        super(props);
    }

    public render()
    {
        return (
            <Form className={this.props.className} headers={this.headers} rows={this.rows} />
        );
    }

    protected get headers() : JSX.Element[]
    {
        return this.props.columns.map( column => column.header );
    }

    protected get rows() : JSX.Element[][]
    {
        return Array.from(this.renderRows());
    }

    protected *renderRows() : Iterable<JSX.Element[]>
    {
        for ( let row of this.props.rows )
        {
            yield this.renderRow(row);
        }
    }

    protected renderRow(row : IRow<COLUMN, INPUT>) : JSX.Element[]
    {
        return this.props.columns.map( column => this.renderCell(row, column) );
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

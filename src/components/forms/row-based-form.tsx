import React from 'react';
import { Form as FormBase } from './form';


export interface IColumn
{
    header : JSX.Element;
}

export interface IRow<COLUMN>
{
    render(column : COLUMN) : JSX.Element
}

export interface IProps<COLUMN extends IColumn>
{
    className ?: string;

    columns : COLUMN[];

    rows: IRow<COLUMN>[];
}

export interface IState
{

}

export class Form<COLUMN extends IColumn> extends React.Component<IProps<COLUMN>, IState>
{
    constructor(props : IProps<COLUMN>)
    {
        super(props);
    }

    public render()
    {
        return (
            <FormBase className={this.props.className} headers={this.headers} rows={this.rows} />
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

    protected renderRows() : JSX.Element[][]
    {
        return this.props.rows.map(row => {
            return this.props.columns.map(column => row.render(column))
        });
    }
}

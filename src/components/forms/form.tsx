import React from 'react';
import './form.scss';


export interface IProps
{
    className ?: string;

    headers : JSX.Element[];

    rows : JSX.Element[][];
}

export interface IState
{

}

export class Form extends React.Component<IProps, IState>
{
    constructor(props : IProps)
    {
        super(props);
    }

    public render()
    {
        const me = this;

        return (
            <table className={this.props.className || 'form'}>
                <tbody>
                    {headers()}
                    {rows()}
                </tbody>
            </table>
        );


        function headers() : JSX.Element
        {
            const contents = me.props.headers.map( (header, index) => {
                return (
                    <th key={`header-${index}`}>
                        {header}
                    </th>
                );
            } );

            return <tr>{contents}</tr>;
        }

        function rows() : JSX.Element[]
        {
            const rows = me.props.rows;

            return rows.map( (r, rowIndex) => {
                return (
                    <tr key={`row-${rowIndex}`}>
                        {row(r)}
                    </tr>
                );
            });
        }

        function row(row : JSX.Element[]) : JSX.Element[]
        {
            return row.map( (elt, index) => {
                return (
                    <td key={`elt-${index}`}>
                        {elt}
                    </td>
                );
            } );
        }
    }
}
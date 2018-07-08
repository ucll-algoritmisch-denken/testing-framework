import React from 'react';
import { Exercise as ExerciseBase } from "../exercise";
import { DescriptionBox } from 'components/description-box';


export abstract class Exercise extends ExerciseBase
{
    protected abstract readonly description : JSX.Element;

    protected abstract readonly headers : JSX.Element[];

    protected abstract renderRows() : Iterable<JSX.Element[]>;

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
                {this.renderTable()}
            </React.Fragment>
        );
    }

    protected renderTable() : JSX.Element
    {
        const me = this;

        return (
            <table className="interpretation-form">
                <tbody>
                    {headers()}
                    {rows()}
                </tbody>
            </table>
        );


        function headers() : JSX.Element
        {
            const contents = me.headers.map( (header, index) => {
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
            return Array.from(me.renderRows()).map( (r, rowIndex) => {
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
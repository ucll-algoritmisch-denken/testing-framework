import React from 'react';
import { Exercise as ExerciseBase } from "../exercise";
import { DescriptionBox } from 'components/description-box';
import { Lazy } from '../../../lazy';
import { Form } from '../../../components/form';


export abstract class Exercise extends ExerciseBase
{
    protected abstract readonly description : JSX.Element;

    protected abstract readonly headers : JSX.Element[];

    protected abstract renderRows() : Iterable<JSX.Element[]>;

    constructor()
    {
        super();

        this.__rows = new Lazy(() => Array.from(this.renderRows()));
    }

    private __rows : Lazy<JSX.Element[][]>;

    private get rows() { return this.__rows.value; }

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
        return (
            <Form className="interpretation-form" headers={this.headers} rows={this.rows} />
        );
    }

    // protected renderTable() : JSX.Element
    // {
    //     const me = this;

    //     return (
    //         <table className="interpretation-form">
    //             <tbody>
    //                 {headers()}
    //                 {rows()}
    //             </tbody>
    //         </table>
    //     );


    //     function headers() : JSX.Element
    //     {
    //         const contents = me.headers.map( (header, index) => {
    //             return (
    //                 <th key={`header-${index}`}>
    //                     {header}
    //                 </th>
    //             );
    //         } );

    //         return <tr>{contents}</tr>;
    //     }

    //     function rows() : JSX.Element[]
    //     {
    //         const rows = me.rows;

    //         return rows.map( (r, rowIndex) => {
    //             return (
    //                 <tr key={`row-${rowIndex}`}>
    //                     {row(r)}
    //                 </tr>
    //             );
    //         });
    //     }

    //     function row(row : JSX.Element[]) : JSX.Element[]
    //     {
    //         return row.map( (elt, index) => {
    //             return (
    //                 <td key={`elt-${index}`}>
    //                     {elt}
    //                 </td>
    //             );
    //         } );
    //     }
    // }
}
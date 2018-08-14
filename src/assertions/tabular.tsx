import React from 'react';
import { Outcome, outcomeToHtmlClass } from '../outcome';
import classNames from 'classnames';
import { Assertion } from './assertion';
import { Maybe } from 'maybe';
import './tabular.scss';


export interface IRow
{
    header : string;

    htmlClasses ?: string[];

    content : JSX.Element;
}

export abstract class TabularAssertion<T> extends Assertion<T>
{
    protected abstract generateRows(actual : Maybe<any>, outcome : Outcome) : Iterable<IRow>;

    protected abstract isCorrect(x : T) : boolean;

    protected get htmlClasses() : string[]
    {
        return [ 'tabular', 'assertion' ];
    }

    protected get explanations() : JSX.Element
    {
        return <React.Fragment />;
    }

    protected renderContent(actual : Maybe<any>, outcome : Outcome) : JSX.Element
    {
        return (
            <React.Fragment>
                {this.explanations}
                {this.renderTable(actual, outcome)}
            </React.Fragment>
        );
    }

    protected renderTable(actual : Maybe<any>, outcome : Outcome) : JSX.Element
    {
        const rows = Array.from(this.generateRows(actual, outcome));

        return (
            <table className={classNames(this.htmlClasses, outcomeToHtmlClass(outcome))}>
                <tbody>
                    {rows.map( (row, index) => this.renderRow(row, index) )}
                </tbody>
            </table>
        );
    }

    private renderRow(row : IRow, index : number) : JSX.Element
    {
        return (
            <tr key={`tabular-row-${index}`}>
                <th>
                    {row.header}
                </th>
                <td className={classNames(row.htmlClasses)}>
                    {row.content}
                </td>
            </tr>
        );
    }
}

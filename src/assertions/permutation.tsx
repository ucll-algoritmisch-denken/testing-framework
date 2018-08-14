import React from 'react';
import { IResult, IAssertion } from '.';
import { Outcome } from '../outcome';
import { IToJsxElement, simple } from '../formatters/jsx-formatters';
import { isPermutation } from 'js-algorithms';
import { Maybe } from 'maybe';
import './permutation.scss';


class PermutationAssertion<T> implements IAssertion<T>
{
    constructor(private expected : any, private formatter : IToJsxElement<any>) {  }

    check(actual : any) : IResult
    {
        return new PermutationAssertionResult(this.expected, actual, this.formatter);
    }
}

class PermutationAssertionResult implements IResult
{
    constructor(private expected : any, private actual : Maybe<any>, private formatter : IToJsxElement<any>) { }

    get outcome(): Outcome
    {
        return this.actual.caseOf({
            just: value => isPermutation(this.expected, value) ? Outcome.Pass : Outcome.Fail,
            nothing: () => Outcome.Skip
        });
    }

    get content() : JSX.Element
    {
        return this.createTable();
    }

    private createDescription() : JSX.Element
    {
        return (
            <p>
                Your result should be a permutation of the expected array, i.e.,
                it should contain the same elements, but not necessarily
                in the same order.
            </p>
        );
    }

    private createExpectedRow() : JSX.Element
    {
        return (
            <tr key="expected">
                <th>Expected</th>
                <td>{this.formatter(this.expected)}</td>
            </tr>
        );
    }

    private createActualRow() : JSX.Element
    {
        return this.actual.caseOf({
            just: value => (
                <tr key="actual">
                    <th>Actual</th>
                    <td>{this.formatter(value)}</td>
                </tr>
            ),
            nothing: () => <React.Fragment />
        });
    }

    private createTable() : JSX.Element
    {
        return (
            <React.Fragment>
                {this.createDescription()}
                <table className="permutation-assertion">
                    <tbody>
                        {this.createExpectedRow()}
                        {this.createActualRow()}
                    </tbody>
                </table>
            </React.Fragment>
        );
    }

}

export function permutation<T>(expected : T, formatter ?: IToJsxElement<any>) : IAssertion<T>
{
    return new PermutationAssertion<T>(expected, formatter || simple);
}

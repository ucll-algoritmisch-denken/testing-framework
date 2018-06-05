import React from 'react';
import { IResult, IAssertion } from 'testing-library/assertions';
import { Outcome } from 'testing-library/outcome';
import { IToJsxElement, simple } from 'testing-library/formatters/jsx-formatters';
import { isPermutation } from 'testing-library/util';
import { IMaybe } from 'testing-library/maybe';
import './permutation.scss';


class PermutationAssertion implements IAssertion
{
    constructor(private expected : any, private formatter : IToJsxElement<any>) {  }

    check(actual : any) : IResult
    {
        return new PermutationAssertionResult(this.expected, actual, this.formatter);
    }
}

class PermutationAssertionResult implements IResult
{
    constructor(private expected : any, private actual : IMaybe<any>, private formatter : IToJsxElement<any>) { }

    get result(): Outcome
    {
        if ( this.actual.hasValue() )
        {
            return isPermutation(this.expected, this.actual.value) ? Outcome.Pass : Outcome.Fail;
        }
        else
        {
            return Outcome.Skip;
        }
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
        if ( this.actual.hasValue() )
        {
            return (
                <tr key="actual">
                    <th>Actual</th>
                    <td>{this.formatter(this.actual.value)}</td>
                </tr>
            );
        }
        else
        {
            return <React.Fragment />;
        }
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

export function createPermutationAssertion(expected : any, formatter ?: IToJsxElement<any>) : IAssertion
{
    return new PermutationAssertion(expected, formatter || simple);
}

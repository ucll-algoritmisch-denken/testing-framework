import React from 'react';
import { IResult, IAssertion } from 'assertions';
import { Outcome } from 'outcome';
import { IToJsxElement, simple } from 'formatters/jsx-formatters';
import { deepEqual } from 'equality';
import { IMaybe } from 'maybe';
import './equality.scss';


export interface IEqualityAssertionOptions
{
    formatter ?: IToJsxElement<any>;
    original ?: any;
}

class EqualityAssertion implements IAssertion
{
    constructor(private expected : any, private options : IEqualityAssertionOptions) {  }

    check(actual : IMaybe<any>) : IResult
    {
        return new EqualityAssertionResult(this.expected, actual, this.options);
    }
}

class EqualityAssertionResult implements IResult
{
    constructor(private expected : any, private actual : IMaybe<any>, private options : IEqualityAssertionOptions) { }

    get result(): Outcome
    {
        if ( this.actual.hasValue() )
        {
            return deepEqual(this.expected, this.actual.value) ? Outcome.Pass : Outcome.Fail;
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

    private createOriginalRow() : JSX.Element
    {
        const original = this.options.original;

        if ( original )
        {
            return (
                <tr key="original">
                    <th>Original</th>
                    <td>{this.formatter(original)}</td>
                </tr>
            );
        }
        else
        {
            return <React.Fragment />;
        }
    }

    private get formatter() : IToJsxElement<any>
    {
        return this.options.formatter || simple;
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
            <table className="equality-assertion">
                <tbody>
                    {this.createOriginalRow()}
                    {this.createExpectedRow()}
                    {this.createActualRow()}
                </tbody>
            </table>
        );
    }
}

export function createEqualityAssertion(expected : any, options ?: IEqualityAssertionOptions ) : IAssertion
{
    options = options || {};
    
    return new EqualityAssertion(expected, options);
}
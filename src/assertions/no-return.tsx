import React from 'react';
import { IResult, IAssertion } from 'assertions';
import { Outcome } from 'outcome';
import { simple } from 'formatters/jsx-formatters';
import { isUndefined } from 'type';
import { IMaybe } from 'maybe';
import './no-return.scss';


class NoReturnAssertion implements IAssertion
{
    constructor() { }

    check(actual : IMaybe<any>): IResult
    {
        return new NoReturnAssertionResult(actual);
    }
}

class NoReturnAssertionResult implements IResult
{
    constructor(private actual : IMaybe<any>) { }

    get content(): JSX.Element
    {
        if ( this.actual.hasValue() && !isUndefined(this.actual.value) )
        {        
            return (
                <React.Fragment>
                    {this.createDescription()}
                    <table className="no-return-assertion">
                        <tbody>
                            <tr key="actual">
                                <th>Return value</th>
                                <td>{simple(this.actual)}</td>
                            </tr>
                        </tbody>
                    </table>
                </React.Fragment>
            );
        }
        else
        {
            return this.createDescription();
        }
    }

    get result() : Outcome
    {
        if ( this.actual.hasValue() )
        {
            if ( isUndefined( this.actual.value ) )
            {
                return Outcome.Pass;
            }
            else
            {
                return Outcome.Fail;
            }
        }
        else
        {
            return Outcome.Skip;
        }
    }

    private createDescription() : JSX.Element
    {
        return (
            <p>
                The function should not return anything.
            </p>
        );
    }
}

export function createNoReturnAssertion() : IAssertion
{
    return new NoReturnAssertion();
}

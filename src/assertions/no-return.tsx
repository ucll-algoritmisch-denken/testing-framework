import React from 'react';
import { IResult, IAssertion } from '../assertions';
import { Outcome } from '../outcome';
import { simple } from '../formatters/jsx-formatters';
import { isUndefined } from '../type';
import { Maybe } from 'tsmonad';
import './no-return.scss';


class NoReturnAssertion implements IAssertion
{
    constructor() { }

    check(actual : Maybe<any>): IResult
    {
        return new NoReturnAssertionResult(actual);
    }
}

class NoReturnAssertionResult implements IResult
{
    constructor(private actual : Maybe<any>) { }

    get content(): JSX.Element
    {
        return this.actual.caseOf({
            just: value => {
                if ( !isUndefined(value) )
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
            },
            nothing: () => this.createDescription()
        });
    }

    get result() : Outcome
    {
        return this.actual.caseOf({
            just: value => {
                if ( isUndefined(value) )
                {
                    return Outcome.Pass;
                }
                else
                {
                    return Outcome.Fail;
                }
            },
            nothing: () => Outcome.Skip
        });
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

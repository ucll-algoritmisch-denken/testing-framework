import React from 'react';
import { IAssertion } from '.';
import { Maybe } from 'maybe';
import { IResult } from './result';
import { Outcome } from 'outcome';


export abstract class NotSameAssertion<T> implements IAssertion<T>
{
    protected abstract readonly original : T;

    check(actual: Maybe<T>) : IResult
    {
        const outcome = actual.caseOf({
            just: x => x !== this.original ? Outcome.Pass : Outcome.Fail,
            nothing: () => Outcome.Skip
        });
        
        return new class implements IResult
        {
            outcome = outcome;

            get content()
            {
                if ( outcome !== Outcome.Pass )
                {
                    return (
                        <React.Fragment>
                            Objects should not be the same.
                        </React.Fragment>
                    );
                }
                else
                {
                    return <React.Fragment />;
                }
            }
        };
    }
}

export function notSame<T>(original : T) : IAssertion<T>
{
    return new class extends NotSameAssertion<T>
    {
        protected get original() : T
        {
            return original;
        }
    };
}

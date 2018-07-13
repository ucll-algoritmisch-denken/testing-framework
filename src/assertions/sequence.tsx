import React from 'react';
import { IAssertion } from './assertion';
import { IResult } from './result';
import { Outcome, combineAssertionOutcomes } from 'outcome';
import { Maybe } from 'monad';


class Sequence<T> implements IAssertion<T>
{
    constructor(private children : IAssertion<T>[], private stopAfterFailure : boolean) { }

    check(x : Maybe<T>) : IResult
    {
        let combinedOutcome = Outcome.Pass;
        let combinedContent : JSX.Element = <React.Fragment />;

        for ( let child of this.children )
        {
            const r = child.check(x);

            combinedOutcome = combineAssertionOutcomes([ combinedOutcome, r.outcome ]);
            combinedContent = (
                <React.Fragment>
                    {combinedContent}
                    {r.content}
                </React.Fragment>
            );

            if ( this.stopAfterFailure && combinedOutcome !== Outcome.Pass )
            {
                return { outcome: combinedOutcome, content: combinedContent };
            }
        }

        return { outcome: combinedOutcome, content: combinedContent };
    }
}

export function sequence<T>(assertions : IAssertion<T>[], stopAfterFailure = false) : IAssertion<T>
{
    return new Sequence(assertions, stopAfterFailure);
}
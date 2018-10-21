import React from 'react';
import { deepEqual } from 'equality';
import { Maybe } from 'maybe';
import { IAssertion } from './assertion';
import { combineAssertionOutcomes } from 'outcome';
import { IResult } from './result';


export function conjunction<T>(...assertions : IAssertion<T>[]) : IAssertion<T>
{
    return new class implements IAssertion<T>
    {
        check(actual: Maybe<T>): IResult
        {
            const results = assertions.map(assertion => assertion.check(actual));
            const outcome = combineAssertionOutcomes(results.map(result => result.outcome));
            const content = (
                <React.Fragment>
                    {results.map((result, index) => (
                        <React.Fragment key={`content-${index}`}>
                            {result.content}
                        </React.Fragment>
                    ))}
                </React.Fragment>
            );

            return { outcome, content };
        }
    };
}

import React from 'react';
import { IAssertion } from '.';
import { Maybe } from 'maybe';
import { IResult } from './result';
import { Outcome } from '../outcome';
import { FunctionCallResults } from '../function-util';


export abstract class NotSameAssertion<T> implements IAssertion<FunctionCallResults>
{
    protected abstract findFirstValue(fcr : FunctionCallResults) : T;

    protected abstract findSecondValue(fcr : FunctionCallResults) : T;

    protected abstract readonly message : JSX.Element;

    check(actual: Maybe<FunctionCallResults>) : IResult
    {
        const me = this;

        const outcome = actual.caseOf({
            just: x => {
                const firstValue = this.findFirstValue(x);
                const secondValue = this.findSecondValue(x);

                return firstValue !== secondValue ? Outcome.Pass : Outcome.Fail
            },
            nothing: () => Outcome.Skip
        });
        
        return new class implements IResult
        {
            outcome = outcome;

            get content()
            {
                if ( outcome !== Outcome.Pass )
                {
                    return me.message;
                }
                else
                {
                    return <React.Fragment />;
                }
            }
        };
    }
}

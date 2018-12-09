import React from 'react';
import { Score } from "../score";
import { Maybe } from 'maybe';


export abstract class TrivialExercise<Ps extends any[], R>
{
    protected abstract readonly testedImplementation : Maybe<(...args : Ps) => R>;

    get score() : Score
    {
        return this.testedImplementation.caseOf({
            just: _ => new Score(1, 1),
            nothing: () => new Score(0, 1),
        });
    }

    render() : JSX.Element
    {
        throw new Error(`Trivial exercise should not be rendered`);
    }
}

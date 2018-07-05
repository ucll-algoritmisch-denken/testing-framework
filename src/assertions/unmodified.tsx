import React from 'react';
import { IAssertion } from '../assertions';
import { deepEqual } from '../equality';
import { Maybe } from 'tsmonad';
import { ComparisonAssertion } from './comparison';
import './unmodified.scss';
import { Outcome } from 'outcome';


export abstract class UnmodifiedAssertion<T> extends ComparisonAssertion<T>
{
    protected abstract readonly original : Maybe<T>;
    
    protected get expected() : Maybe<T>
    {
        return Maybe.nothing();
    }
    
    protected isCorrect(actual: T): boolean
    {
        return deepEqual(this.original.valueOrThrow(), actual);
    }

    protected shouldBeShown(_actual : Maybe<T>, outcome : Outcome) : boolean
    {
        return outcome === Outcome.Fail;
    }

    protected get explanations() : JSX.Element
    {
        return (
            <React.Fragment>
                Value should remain unmodified.
            </React.Fragment>
        );
    }
}

export function unmodified<T>(original : T) : IAssertion<T>
{
    return new class extends UnmodifiedAssertion<T> {
        protected get original() : Maybe<T>
        {
            return Maybe.just(original);
        }
    };
}

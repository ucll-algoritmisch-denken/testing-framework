import React from 'react';
import { IAssertion } from '../assertions';
import { deepEqual } from '../equality';
import { ComparisonAssertion } from './comparison';
import { Outcome } from 'outcome';
import { Maybe } from '../monad';
import './unmodified.scss';


export abstract class UnmodifiedAssertion<T> extends ComparisonAssertion<T>
{
    protected abstract readonly original : Maybe<T>;
    
    protected get expected() : Maybe<T>
    {
        return Maybe.nothing();
    }
    
    protected isCorrect(actual: T): boolean
    {
        if ( this.original.isJust() )
        {
            return deepEqual(this.original.value, actual);
        }
        else
        {
            throw new Error(`Bug in testing framework`);
        }
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

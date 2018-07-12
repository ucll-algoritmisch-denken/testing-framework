import React from 'react';
import { IAssertion } from '../assertions';
import * as Type from 'type';
import { IFunctionCallResults } from 'function-util';
import { ComparisonAssertion } from './comparison';
import { Maybe } from '../monad';
import { returnValue } from './return-value';
import './no-return.scss';
import { Outcome } from '../outcome';


class NoReturnAssertion extends ComparisonAssertion<any>
{
    protected get original() : Maybe<any>
    {
        return Maybe.nothing();
    }

    protected get expected() : Maybe<any>
    {
        return Maybe.nothing();
    }

    protected isCorrect(x: any): boolean
    {
        return Type.undef.hasType(x);
    }
    
    protected get explanations() : JSX.Element
    {
        return (
            <React.Fragment>
                The function should not return a value.
            </React.Fragment>
        );
    }

    protected shouldBeShown(_actual : Maybe<any>, outcome : Outcome) : boolean
    {
        return outcome === Outcome.Fail;
    }
}

export function noReturn() : IAssertion<IFunctionCallResults>
{
    return new NoReturnAssertion();
}

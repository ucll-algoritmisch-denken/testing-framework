import React from 'react';
import { IResult, IAssertion } from '../assertions';
import { Outcome } from '../outcome';
import * as Type from 'type';
import { Maybe } from 'tsmonad';
import './no-return.scss';
import { IFunctionCallResults } from 'function-util';
import { ComparisonAssertion } from './comparison';


class NoReturnAssertion extends ComparisonAssertion<IFunctionCallResults>
{
    protected get original() : Maybe<IFunctionCallResults>
    {
        return Maybe.nothing();
    }

    protected get expected() : Maybe<IFunctionCallResults>
    {
        return Maybe.nothing();
    }

    protected isCorrect(x: IFunctionCallResults): boolean
    {
        return Type.undef.hasType(x.returnValue);
    }
    
    protected get explanations() : JSX.Element
    {
        return (
            <React.Fragment>
                The function should not return a value.
            </React.Fragment>
        );
    }
}

export function noReturn() : IAssertion<IFunctionCallResults>
{
    return new NoReturnAssertion();
}

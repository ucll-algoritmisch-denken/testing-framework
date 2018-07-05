import { Maybe } from 'tsmonad';
import { IAssertion } from './assertion';
import { IResult } from './result';
import { Outcome } from 'outcome';


class Decorator<T> implements IAssertion<T>
{
    constructor(private decoratorFunction : (outcome : Outcome, content : JSX.Element) => JSX.Element, private assertion : IAssertion<T>) { }

    check(x : Maybe<any>) : IResult
    {
        const result = this.assertion.check(x);
        const outcome = result.outcome;
        const content = result.content ? this.decoratorFunction(outcome, result.content) : null;

        return { outcome, content };
    }
}

export function decorate<T>(decoratorFunction : (outcome : Outcome, content : JSX.Element) => JSX.Element, assertion : IAssertion<T>) : IAssertion<T>
{
    return new Decorator(decoratorFunction, assertion);
}
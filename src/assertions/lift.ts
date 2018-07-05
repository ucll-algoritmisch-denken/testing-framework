import { IAssertion } from "./assertion";
import { IFunctionCallResults } from "function-util";
import { IResult } from "./result";
import { Maybe } from "tsmonad";


class LiftAssertion<T, U> implements IAssertion<T>
{
    constructor(private func : (t : T) => U, private assertion : IAssertion<U>) { }

    check(actual : Maybe<T>) : IResult
    {
        const value : Maybe<U> = actual.lift(x => this.func(x));

        return this.assertion.check(value);
    }
}

export function lift<T, U>(f : (t : T ) => U, assertion : IAssertion<U>) : IAssertion<T>
{
    return new LiftAssertion(f, assertion);
}
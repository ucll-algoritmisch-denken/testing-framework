import { Maybe } from "tsmonad";
import { IResult } from "./result";
import { Outcome } from "outcome";


export interface IAssertion<T>
{
    check(actual : Maybe<T>) : IResult;
}

export abstract class Assertion<T> implements IAssertion<T>
{
    protected abstract isCorrect(x : T) : boolean;

    protected abstract renderContent(actual : Maybe<T>, outcome : Outcome) : JSX.Element;

    check(actual : Maybe<T>) : IResult
    {
        const outcome = this.determineOutcome(actual);
        const content = this.shouldBeShown(actual, outcome) ? this.renderContent(actual, outcome) : null;

        return { outcome, content };
    }

    protected determineOutcome(actual : Maybe<T>) : Outcome
    {
        return actual.caseOf({
            just: x => this.isCorrect(x) ? Outcome.Pass : Outcome.Fail,
            nothing: () => Outcome.Skip
        });
    }

    protected shouldBeShown(actual : Maybe<T>, outcome : Outcome) : boolean
    {
        return true;
    }
}
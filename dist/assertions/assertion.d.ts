/// <reference types="react" />
import { IResult } from "./result";
import { Outcome } from "../outcome";
import { Maybe } from "maybe";
export interface IAssertion<T> {
    check(actual: Maybe<T>): IResult;
}
export declare abstract class Assertion<T> implements IAssertion<T> {
    protected abstract isCorrect(x: T): boolean;
    protected abstract renderContent(actual: Maybe<T>, outcome: Outcome): JSX.Element;
    check(actual: Maybe<T>): IResult;
    protected determineOutcome(actual: Maybe<T>): Outcome;
    protected shouldBeShown(actual: Maybe<T>, outcome: Outcome): boolean;
}

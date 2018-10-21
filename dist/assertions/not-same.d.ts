import { IAssertion } from '.';
import { Maybe } from 'maybe';
import { IResult } from './result';
export declare abstract class NotSameAssertion<T> implements IAssertion<T> {
    protected abstract readonly original: T;
    check(actual: Maybe<T>): IResult;
}
export declare function notSame<T>(original: T): IAssertion<T>;

import { IAssertion } from '.';
import { ComparisonAssertion } from './comparison';
import { Maybe } from 'maybe';
export declare abstract class EqualityAssertion<T> extends ComparisonAssertion<T> {
    protected isCorrect(actual: T): boolean;
}
export declare function equality<T>(expected: T, original: Maybe<T>): IAssertion<T>;

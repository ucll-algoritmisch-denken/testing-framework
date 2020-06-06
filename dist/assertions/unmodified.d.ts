/// <reference types="react" />
import { IAssertion } from '.';
import { ComparisonAssertion } from './comparison';
import { Outcome } from '../outcome';
import { Maybe } from 'maybe';
import './unmodified.scss';
export declare abstract class UnmodifiedAssertion<T> extends ComparisonAssertion<T> {
    protected abstract readonly original: Maybe<T>;
    protected get expected(): Maybe<T>;
    protected isCorrect(actual: T): boolean;
    protected shouldBeShown(_actual: Maybe<T>, outcome: Outcome): boolean;
    protected get explanations(): JSX.Element;
}
export declare function unmodified<T>(original: T): IAssertion<T>;

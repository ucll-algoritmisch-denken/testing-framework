import { Outcome } from '../outcome';
import './comparison.scss';
import { TabularAssertion, IRow } from './tabular';
import { Maybe } from 'maybe';
export declare abstract class ComparisonAssertion<T> extends TabularAssertion<T> {
    protected abstract readonly original: Maybe<T>;
    protected abstract readonly expected: Maybe<T>;
    protected abstract isCorrect(actual: T): boolean;
    protected renderValue(x: T): JSX.Element;
    protected readonly htmlClasses: string[];
    protected generateRows(actual: Maybe<any>, outcome: Outcome): Iterable<IRow>;
    protected renderOriginalRow(original: any): JSX.Element;
    protected renderExpectedRow(expected: any): JSX.Element;
    protected renderActualRow(actual: any): JSX.Element;
}

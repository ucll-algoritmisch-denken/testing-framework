/// <reference types="react" />
import { Outcome } from '../outcome';
import { Assertion } from './assertion';
import { Maybe } from 'maybe';
import './tabular.scss';
export interface IRow {
    header: string;
    htmlClasses?: string[];
    content: JSX.Element;
}
export declare abstract class TabularAssertion<T> extends Assertion<T> {
    protected abstract generateRows(actual: Maybe<any>, outcome: Outcome): Iterable<IRow>;
    protected abstract isCorrect(x: T): boolean;
    protected readonly htmlClasses: string[];
    protected readonly explanations: JSX.Element;
    protected renderContent(actual: Maybe<any>, outcome: Outcome): JSX.Element;
    protected renderTable(actual: Maybe<any>, outcome: Outcome): JSX.Element;
    private renderRow;
}

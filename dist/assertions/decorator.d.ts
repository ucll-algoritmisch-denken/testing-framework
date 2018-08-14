/// <reference types="react" />
import { IAssertion } from './assertion';
import { Outcome } from '../outcome';
export declare function decorate<T>(decoratorFunction: (outcome: Outcome, content: JSX.Element) => JSX.Element, assertion: IAssertion<T>): IAssertion<T>;

/// <reference types="react" />
import { IAssertion } from '.';
import { Maybe } from 'maybe';
import { IResult } from './result';
import { FunctionCallResults } from '../function-util';
export declare abstract class NotSameAssertion<T> implements IAssertion<FunctionCallResults> {
    protected abstract findFirstValue(fcr: FunctionCallResults): T;
    protected abstract findSecondValue(fcr: FunctionCallResults): T;
    protected abstract readonly message: JSX.Element;
    check(actual: Maybe<FunctionCallResults>): IResult;
}

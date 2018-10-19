/// <reference types="react" />
import { TypedFunctionCallResults } from '../function-util';
import { IAssertion } from '../assertions';
import { ReferenceImplementationBasedCodingExercise } from './reference-implementation-based-coding-exercise';
export interface IParameterChecker<T, META = {}> {
    (original: T, expected: T, meta: META): IAssertion<T>;
}
export interface IParameterCheckers<META = {}> {
    [key: string]: IParameterChecker<any, META>;
}
export declare abstract class ParameterCodingExercise<Ps extends any[], R, META = {}> extends ReferenceImplementationBasedCodingExercise<Ps, R, META> {
    /**
     * Checkers that define which assertion to create for each parameter.
     * If no checker is defined for a parameter, an unmodified assertion is created.
     */
    protected abstract readonly parameterCheckers: IParameterCheckers<META>;
    protected createReturnValueAssertion(expectedReturnValue: R, metadata: META): IAssertion<R>;
    protected createParameterAssertion(parameterIndex: number, parameterName: string, originalValue: any, expectedValue: any, metadata: META): IAssertion<any>;
    protected renderTestCaseHeader(expected: TypedFunctionCallResults<Ps, R>, _metadata: META): JSX.Element;
}

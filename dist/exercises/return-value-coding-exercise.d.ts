/// <reference types="react" />
import { TypedFunctionCallResults } from '../function-util';
import { IAssertion } from '../assertions';
import { ReferenceImplementationBasedCodingExercise } from './reference-implementation-based-coding-exercise';
/**
 * Reference implementation based coding exercise where given the same parameter values,
 * the reference implementation and tested implementation are expected to have
 * matching return values.
 *
 * Parameter values are checked and expected to remain unmodified.
 */
export declare abstract class ReturnValueCodingExercise<Ps extends any[], R, META = {}> extends ReferenceImplementationBasedCodingExercise<Ps, R, META> {
    protected createReturnValueAssertion(expectedReturnValue: R, metadata: META): IAssertion<R>;
    protected createParameterAssertion(_parameterIndex: number, parameterName: string, originalValue: any, expectedValue: any, metadata: META): IAssertion<any>;
    protected renderTestCaseHeader(expected: TypedFunctionCallResults<Ps, R>, _metadata: META): JSX.Element;
}

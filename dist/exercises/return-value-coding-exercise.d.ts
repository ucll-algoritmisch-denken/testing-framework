/// <reference types="react" />
import { Maybe } from 'maybe';
import { TypedFunctionCallResults } from '../function-util';
import { ITestCase } from './test-case';
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
    protected createTestCaseFromInputs(expected: TypedFunctionCallResults<Ps, R>, actual: Maybe<TypedFunctionCallResults<Ps, R>>, metadata: META): ITestCase;
    /**
     * Creates a single assertion based on expected results. This assertion can be composite, i.e., it
     * can contain subassertions related to parameter values and return value.
     *
     * See createReturnValueAssertion and createParameterAssertion.
     *
     * @param expected Expected results
     * @param metadata Extra data
     */
    protected createAssertion(expected: TypedFunctionCallResults<Ps, R>, metadata: META): IAssertion<TypedFunctionCallResults<Ps, R>>;
    protected createReturnValueAssertion(expectedReturnValue: R, metadata: META): IAssertion<R>;
    protected createParameterAssertion(_parameterIndex: number, parameterName: string, originalValue: any): IAssertion<any>;
    protected renderTestCaseHeader(expected: TypedFunctionCallResults<Ps, R>, _metadata: META): JSX.Element;
}

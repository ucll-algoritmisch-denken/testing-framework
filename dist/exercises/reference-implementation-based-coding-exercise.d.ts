/// <reference types="react" />
import { TestCaseBasedCodingExercise } from './test-case-based-coding-exercise';
import { Maybe } from 'maybe';
import { TypedFunctionCallResults } from '../function-util';
import { ITestCase } from './test-case';
import { IAssertion } from '../assertions';
export interface ITestCaseInput<Ps extends any[], META = {}> {
    readonly parameterValues: Ps;
    readonly metadata: META;
}
export declare abstract class ReferenceImplementationBasedCodingExercise<Ps extends any[], R, META = {}> extends TestCaseBasedCodingExercise {
    abstract readonly referenceImplementation: (...args: Ps) => R;
    protected abstract readonly testedImplementation: Maybe<(...args: Ps) => R>;
    protected abstract createReturnValueAssertion(expectedReturnValue: R, metadata: META): IAssertion<R>;
    protected abstract createParameterAssertion(_parameterIndex: number, parameterName: string, originalValue: any, expectedValue: any, metadata: META): IAssertion<any>;
    protected abstract generateTestCaseInputs(): Iterable<ITestCaseInput<Ps, META>>;
    protected abstract renderTestCaseHeader(expected: TypedFunctionCallResults<Ps, R>, _metadata: META): JSX.Element;
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
    protected generateTestCases(): Iterable<ITestCase>;
}

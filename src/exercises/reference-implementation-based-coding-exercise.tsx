import { TestCaseBasedCodingExercise } from './test-case-based-coding-exercise';
import { Maybe } from 'maybe';
import { typedCallFunction, TypedFunctionCallResults } from '../function-util';
import { ITestCase } from './test-case';



export interface ITestCaseInput<Ps extends any[], META = {}>
{
    readonly parameterValues : Ps;

    readonly metadata : META;
}


export abstract class ReferenceImplementationBasedCodingExercise<Ps extends any[], R, META = {}> extends TestCaseBasedCodingExercise
{
    protected abstract readonly referenceImplementation : (...args : Ps) => R;
    
    protected abstract readonly testedImplementation : Maybe<(...args : Ps) => R>;

    protected abstract generateTestCaseInputs() : Iterable<ITestCaseInput<Ps, META>>;

    protected abstract createTestCaseFromInputs(expected : TypedFunctionCallResults<Ps, R>, actual : Maybe<TypedFunctionCallResults<Ps, R>>, metadata : META) : ITestCase;

    protected *generateTestCases() : Iterable<ITestCase>
    {
        for ( let testCaseInput of this.generateTestCaseInputs() )
        {
            const expected = typedCallFunction(this.referenceImplementation, ...testCaseInput.parameterValues);
            const actual = this.testedImplementation.lift( f => typedCallFunction(f, ...testCaseInput.parameterValues) );

            yield this.createTestCaseFromInputs(expected, actual, testCaseInput.metadata);
        }
    }
}

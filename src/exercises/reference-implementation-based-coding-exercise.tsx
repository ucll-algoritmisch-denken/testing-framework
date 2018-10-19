import { TestCaseBasedCodingExercise } from './test-case-based-coding-exercise';
import { Maybe } from 'maybe';
import { typedCallFunction, TypedFunctionCallResults, parseFunction } from '../function-util';
import { ITestCase } from './test-case';
import { IAssertion } from '../assertions';
import { CollapsibleTestCase } from './collapsible-test-case';
import { Outcome } from '../outcome';
import * as Assertions from '../assertions';
import { range } from 'js-algorithms';


export interface ITestCaseInput<Ps extends any[], META = {}>
{
    readonly parameterValues : Ps;

    readonly metadata : META;
}

export abstract class ReferenceImplementationBasedCodingExercise<Ps extends any[], R, META = {}> extends TestCaseBasedCodingExercise
{
    public abstract readonly referenceImplementation : (...args : Ps) => R;
    
    protected abstract readonly testedImplementation : Maybe<(...args : Ps) => R>;

    protected abstract createReturnValueAssertion(expectedReturnValue : R, metadata : META) : IAssertion<R>;

    protected abstract createParameterAssertion(_parameterIndex : number, parameterName : string, originalValue : any, expectedValue : any, metadata : META) : IAssertion<any>;

    protected abstract generateTestCaseInputs() : Iterable<ITestCaseInput<Ps, META>>;

    protected abstract renderTestCaseHeader(expected : TypedFunctionCallResults<Ps, R>, _metadata : META) : JSX.Element;

    protected createTestCaseFromInputs(expected : TypedFunctionCallResults<Ps, R>, actual : Maybe<TypedFunctionCallResults<Ps, R>>, metadata : META) : ITestCase
    {
        const assertion = this.createAssertion(expected, metadata);
        const result = assertion.check(actual);
        const header = this.renderTestCaseHeader(expected, metadata);
        const { outcome, content } = result;

        if ( !content )
        {
            throw new Error("Assertion has no content");
        }
        else
        {
            // Needed lest TypeScript forgets about it being nonnull
            const nonNullContent = content;

            return new class extends CollapsibleTestCase 
            {
                protected get header() : JSX.Element
                {
                    return header;
                }

                protected get content() : JSX.Element
                {
                    return nonNullContent;
                }

                public get outcome() : Outcome
                {
                    return outcome;
                }
            };
        }
    }

    /**
     * Creates a single assertion based on expected results. This assertion can be composite, i.e., it
     * can contain subassertions related to parameter values and return value.
     * 
     * See createReturnValueAssertion and createParameterAssertion.
     * 
     * @param expected Expected results
     * @param metadata Extra data
     */
    protected createAssertion(expected : TypedFunctionCallResults<Ps, R>, metadata : META) : IAssertion<TypedFunctionCallResults<Ps, R>>
    {
        const returnValueAssertion : IAssertion<TypedFunctionCallResults<Ps, R>> = Assertions.typedReturnValue(this.createReturnValueAssertion(expected.returnValue, metadata));

        const parameterAssertions : IAssertion<TypedFunctionCallResults<Ps, R>>[] = range(0, expected.argumentsBeforeCall.length).map( parameterIndex => {
            const parameterName = parseFunction(this.referenceImplementation).parameterNames[parameterIndex];
            const originalValue = expected.argumentsBeforeCall[parameterIndex];
            const expectedValue = expected.argumentsAfterCall[parameterIndex];
            const parameterAssertion = this.createParameterAssertion(parameterIndex, parameterName, originalValue, expectedValue, metadata);

            return Assertions.typedParameter(parameterIndex, parameterName, parameterAssertion);
        });

        return Assertions.sequence( [ returnValueAssertion, ...parameterAssertions ] );
    }

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

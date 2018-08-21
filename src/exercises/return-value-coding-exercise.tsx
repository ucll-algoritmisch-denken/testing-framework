import React from 'react';
import { Outcome } from '../outcome';
import { Maybe } from 'maybe';
import { TypedFunctionCallResults, parseFunction } from '../function-util';
import { ITestCase } from './test-case';
import { CollapsibleTestCase } from './collapsible-test-case';
import * as Assertions from '../assertions';
import { IAssertion } from '../assertions';
import { range } from 'js-algorithms';
import { ReferenceImplementationBasedCodingExercise } from './reference-implementation-based-coding-exercise';
import { convertToString } from '../formatters/string-formatters';
import { code } from '../formatters/jsx-formatters';


/**
 * Reference implementation based coding exercise where given the same parameter values,
 * the reference implementation and tested implementation are expected to have
 * matching return values.
 * 
 * Parameter values are checked and expected to remain unmodified.
 */
export abstract class ReturnValueCodingExercise<Ps extends any[], R, META = {}> extends ReferenceImplementationBasedCodingExercise<Ps, R, META>
{
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

            return Assertions.typedParameter(parameterIndex, parameterName, this.createParameterAssertion(parameterIndex, parameterName, originalValue));
        });

        return Assertions.sequence( [ returnValueAssertion, ...parameterAssertions ] );
    }

    protected createReturnValueAssertion(expectedReturnValue : R, metadata : META) : IAssertion<R>
    {
        return Assertions.equality(expectedReturnValue, Maybe.nothing());
    }

    protected createParameterAssertion(_parameterIndex : number, parameterName : string, originalValue : any) : IAssertion<any>
    {
        return Assertions.unmodified(originalValue);
    }

    protected renderTestCaseHeader(expected : TypedFunctionCallResults<Ps, R>, _metadata : META) : JSX.Element
    {
        const argumentsString = expected.argumentsBeforeCall.map( convertToString ).join(", ");
        const returnValue = code(convertToString(expected.returnValue));
        const call = code(`${parseFunction(this.referenceImplementation).functionName}(${argumentsString})`);

        return (
            <React.Fragment>
                {call}&nbsp;should return&nbsp;{returnValue}.
            </React.Fragment>
        );
    }
}


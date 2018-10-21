import React from 'react';
import { ITestCase, CollapsibleTestCase } from '../test-case';
import { Exercise } from './exercise';
import { FunctionCallResults } from '../../../../function-util';
import * as Assertions from '../../../../assertions';
import { IAssertion } from '../../../../assertions';
import { convertToString } from '../../../../formatters/string-formatters';
import { code } from '../../../../formatters/jsx-formatters';
import { Maybe } from 'maybe';
import { Outcome } from '../../../../outcome';


export interface IParameterChecker<META = {}>
{
    (original : any, expected : any, meta : META) : IAssertion<any>;
}

export interface IParameterCheckers<META = {}>
{
    [key : string] : IParameterChecker<META>;
}

export abstract class Parameters<META = {}> extends Exercise<META>
{
    /**
     * Checkers that define which assertion to create for each parameter.
     * If no checker is defined for a parameter, an unmodified assertion is created.
     */
    protected abstract readonly parameterCheckers : IParameterCheckers<META>;

    protected createAssertion(expected : FunctionCallResults, metadata : META) : IAssertion<FunctionCallResults>
    {
        // Create assertion for return value; by default this assertion is "must be undefined"
        const returnValueAssertion = Assertions.returnValue( this.createReturnValueAssertion() );

        const argumentAssertions = this.referenceInformation.parameterNames.map( (parameterName, parameterIndex) => {
            const checker = this.parameterCheckers[parameterName];
            const originalArgumentValue = expected.argumentsBeforeCall[parameterIndex];

            if ( checker )
            {
                // Ask checker to create assertion for current parameter
                const expectedArgumentValue = expected.argumentsAfterCall[parameterIndex];
                const assertion = checker(originalArgumentValue, expectedArgumentValue, metadata);

                return Assertions.parameter(parameterIndex, parameterName, assertion);
            }
            else
            {
                // No checker found for current parameter, create default assertion, i.e. unmodified
                return Assertions.parameter(parameterIndex, parameterName, Assertions.unmodified(originalArgumentValue));
            }
        });

        return Assertions.sequence( [ returnValueAssertion, ...argumentAssertions ] );
    }

    protected createReturnValueAssertion() : IAssertion<FunctionCallResults>
    {
        return Assertions.noReturn();
    }

    protected renderTestCaseHeader(expected : FunctionCallResults, _metadata : META) : JSX.Element
    {
        const argumentsString = expected.argumentsBeforeCall.map( convertToString ).join(", ");
        const call = code(`${this.referenceInformation.functionName}(${argumentsString})`);

        return (
            <React.Fragment>
                {call}
            </React.Fragment>
        );
    }

    protected createTestCaseFromInputs(expected : FunctionCallResults, actual : Maybe<FunctionCallResults>, metadata : META) : ITestCase
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
}
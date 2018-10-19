import React from 'react';
import { Maybe } from 'maybe';
import { TypedFunctionCallResults, parseFunction } from '../function-util';
import { ITestCase } from './test-case';
import * as Assertions from '../assertions';
import { IAssertion } from '../assertions';
import { ReferenceImplementationBasedCodingExercise } from './reference-implementation-based-coding-exercise';
import { convertToString } from '../formatters/string-formatters';
import { code } from '../formatters/jsx-formatters';


export interface IParameterChecker<T, META = {}>
{
    (original : T, expected : T, meta : META) : IAssertion<T>;
}

export interface IParameterCheckers<META = {}>
{
    [key : string] : IParameterChecker<any, META>;
}

export abstract class ParameterCodingExercise<Ps extends any[], R, META = {}> extends ReferenceImplementationBasedCodingExercise<Ps, R, META>
{
    /**
     * Checkers that define which assertion to create for each parameter.
     * If no checker is defined for a parameter, an unmodified assertion is created.
     */
    protected abstract readonly parameterCheckers : IParameterCheckers<META>;

    protected createReturnValueAssertion(expectedReturnValue : R, metadata : META) : IAssertion<R>
    {
        return Assertions.noReturn();
    }

    protected createParameterAssertion(parameterIndex : number, parameterName : string, originalValue : any, expectedValue : any, metadata : META) : IAssertion<any>
    {
        const me = this;
        const parameterAssertion = createParameterAssertion();

        return Assertions.parameter(parameterIndex, parameterName, parameterAssertion);


        function createParameterAssertion()
        {
            const checker = me.parameterCheckers[parameterName];

            if ( checker )
            {
                // Ask checker to create assertion for current parameter
                return checker(originalValue, expectedValue, metadata);
            }
            else
            {
                // No checker found for current parameter, create default assertion, i.e. unmodified
                return Assertions.unmodified(originalValue);
            }
        }
    }

    protected renderTestCaseHeader(expected : TypedFunctionCallResults<Ps, R>, _metadata : META) : JSX.Element
    {
        const argumentsString = expected.argumentsBeforeCall.map( convertToString ).join(", ");
        const call = code(`${parseFunction(this.referenceImplementation).functionName}(${argumentsString})`);

        return (
            <React.Fragment>
                {call}
            </React.Fragment>
        );
    }
}


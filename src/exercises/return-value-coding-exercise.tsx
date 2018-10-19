import React from 'react';
import { Maybe } from 'maybe';
import { TypedFunctionCallResults, parseFunction } from '../function-util';
import * as Assertions from '../assertions';
import { IAssertion } from '../assertions';
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
    protected createReturnValueAssertion(expectedReturnValue : R, metadata : META) : IAssertion<R>
    {
        return Assertions.equality(expectedReturnValue, Maybe.nothing());
    }

    protected createParameterAssertion(_parameterIndex : number, parameterName : string, originalValue : any, expectedValue : any, metadata : META) : IAssertion<any>
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


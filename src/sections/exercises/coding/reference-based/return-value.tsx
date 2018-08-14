import React from 'react';
import _ from 'lodash';
import { ITestCase, CollapsibleTestCase } from '../test-case';
import { Exercise } from './exercise';
import { FunctionCallResults } from '../../../../function-util';
import { IAssertion } from '../../../../assertions';
import * as Assertions from '../../../../assertions';
import { code } from '../../../../formatters/jsx-formatters';
import { convertToString } from '../../../../formatters/string-formatters';
import { Maybe } from 'maybe';
import { Outcome } from 'outcome';


export abstract class ReturnValue<META = {}> extends Exercise<META>
{
    protected createAssertion(expected : FunctionCallResults, metadata : META) : IAssertion<FunctionCallResults>
    {
        const returnValueAssertion = Assertions.returnValue(this.createReturnValueAssertion(expected.returnValue, metadata));

        const parameterAssertions = _.range(0, expected.argumentsBeforeCall.length).map( parameterIndex => {
            const parameterName = this.referenceInformation.parameterNames[parameterIndex];
            const originalValue = expected.argumentsBeforeCall[parameterIndex];

            return Assertions.parameter(parameterIndex, parameterName, this.createParameterAssertion(parameterIndex, parameterName, originalValue));
        });

        return Assertions.sequence( [ returnValueAssertion ].concat(parameterAssertions) );
    }

    protected createReturnValueAssertion(expectedReturnValue : any, _metadata : META) : IAssertion<any>
    {
        return Assertions.equality(expectedReturnValue, Maybe.nothing());
    }

    protected createParameterAssertion(_parameterIndex : number, _parameterName : string, originalValue : any) : IAssertion<any>
    {
        return Assertions.unmodified(originalValue);
    }

    protected renderTestCaseHeader(expected : FunctionCallResults, _metadata : META) : JSX.Element
    {
        const argumentsString = expected.argumentsBeforeCall.map( convertToString ).join(", ");
        const returnValue = code(convertToString(expected.returnValue));
        const call = code(`${this.referenceInformation.functionName}(${argumentsString})`);

        return (
            <React.Fragment>
                {call}&nbsp;should return&nbsp;{returnValue}.
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
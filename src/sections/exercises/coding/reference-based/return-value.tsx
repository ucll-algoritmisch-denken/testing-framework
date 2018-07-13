import React from 'react';
import _ from 'lodash';
import { ITestCase } from '../test-case';
import { Exercise } from './exercise';
import { IFunctionCallResults } from '../../../../function-util';
import { IAssertion } from '../../../../assertions';
import * as Assertions from '../../../../assertions';
import { code } from '../../../../formatters/jsx-formatters';
import { convertToString } from '../../../../formatters/string-formatters';
import { Maybe } from '../../../../monad';


export abstract class ReturnValue<META = {}> extends Exercise<META>
{
    protected createAssertion(expected : IFunctionCallResults, metadata : META) : IAssertion<IFunctionCallResults>
    {
        const returnValueAssertion = Assertions.returnValue(this.createReturnValueAssertion(expected.returnValue, metadata));

        const parameterAssertions = _.range(0, expected.argumentsBeforeCall.length).map( parameterIndex => {
            const parameterName = this.referenceParameterName(parameterIndex);
            const originalValue = expected.argumentsBeforeCall[parameterIndex];

            return Assertions.parameter(parameterIndex, parameterName, this.createParameterAssertion(parameterIndex, parameterName, originalValue));
        });

        return Assertions.sequence( [ returnValueAssertion ].concat(parameterAssertions) );
    }

    protected createReturnValueAssertion(returnValue : any, _metadata : META) : IAssertion<any>
    {
        return Assertions.equality(returnValue);
    }

    protected createParameterAssertion(_parameterIndex : number, _parameterName : string, originalValue : any) : IAssertion<any>
    {
        return Assertions.unmodified(originalValue);
    }

    protected renderTestCaseHeader(expected : IFunctionCallResults, _metadata : META) : JSX.Element
    {
        const argumentsString = expected.argumentsBeforeCall.map( convertToString ).join(", ");
        const returnValue = code(convertToString(expected.returnValue));
        const call = code(`${this.referenceName}(${argumentsString})`);

        return (
            <React.Fragment>
                {call}&nbsp;should return&nbsp;{returnValue}.
            </React.Fragment>
        );
    }

    protected createTestCaseFromInputs(expected : IFunctionCallResults, actual : Maybe<IFunctionCallResults>, metadata : META) : ITestCase
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
            return {
                header,
                outcome,
                content
            };
        }
    }
}
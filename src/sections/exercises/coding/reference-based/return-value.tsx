import React from 'react';
import _ from 'lodash';
import { ITestCase } from '../test-case';
import { IFunctionCallResults } from '../../../../function-util';
import { Exercise } from './exercise';
import { IAssertion } from '../../../../assertions';
import { convertToString } from '../../../../formatters/string-formatters';
import { code } from '../../../../formatters/jsx-formatters';
import * as Assertions from '../../../../assertions';
import { Maybe } from '../../../../monad';


export abstract class ReturnValue<META = {}> extends Exercise<META>
{
    protected createAssertion(expected : IFunctionCallResults, metadata : META) : IAssertion<IFunctionCallResults>
    {
        const returnValueAssertion = this.createReturnValueAssertion(expected.returnValue, metadata);

        const unmodifiedArgumentAssertions = _.range(0, expected.argumentsBeforeCall.length).map( parameterIndex => {
            const parameterName = this.referenceParameterName(parameterIndex);
            const originalValue = expected.argumentsBeforeCall[parameterIndex];

            return this.createUnmodifiedArgumentAssertion(parameterIndex, parameterName, originalValue);
        });

        return Assertions.sequence( [ returnValueAssertion ].concat(unmodifiedArgumentAssertions) );
    }

    protected createReturnValueAssertion(returnValue : any, _metadata : META) : IAssertion<IFunctionCallResults>
    {
        return Assertions.returnValue(Assertions.equality(returnValue));
    }

    protected createUnmodifiedArgumentAssertion(parameterIndex : number, parameterName : string, originalValue : any) : IAssertion<IFunctionCallResults>
    {
        return Assertions.parameter(parameterIndex, parameterName, Assertions.unmodified(originalValue));
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
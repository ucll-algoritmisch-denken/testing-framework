import React from 'react';
import { ITestCase } from '../test-case';
import { IFunctionCallResults } from '../../../../function-util';
import { Exercise } from './exercise';
import { IAssertion } from '../../../../assertions';
import { convertToString } from '../../../../formatters/string-formatters';
import { code } from '../../../../formatters/jsx-formatters';
import * as Assertions from '../../../../assertions';
import { Maybe } from '../../../../monad';


export interface IParameterChecker<META>
{
    (expected : any, meta : META) : IAssertion<any>;
}

export interface IParameterCheckers<META>
{
    [key : string] : IParameterChecker<META>;
}

export abstract class Parameters<META = {}> extends Exercise<META>
{
    protected abstract readonly parameterCheckers : IParameterCheckers<META>;

    protected createAssertion(expected : IFunctionCallResults, metadata : META) : IAssertion<IFunctionCallResults>
    {
        const returnValueAssertion = this.createReturnValueAssertion();

        const argumentAssertions = this.referenceInformation.parameterNames.map( (parameterName, parameterIndex) => {
            const checker = this.parameterCheckers[parameterName];

            if ( checker )
            {
                const expectedArgumentValue = expected.argumentsAfterCall[parameterIndex];
                const assertion = checker(expectedArgumentValue, metadata);

                return Assertions.parameter(parameterIndex, parameterName, assertion);
            }
            else
            {
                const originalValue = expected.argumentsBeforeCall[parameterIndex];

                return this.createUnmodifiedArgumentAssertion(parameterIndex, parameterName, originalValue);
            }
        });

        return Assertions.sequence( [ returnValueAssertion ].concat(argumentAssertions) );
    }

    protected createReturnValueAssertion() : IAssertion<IFunctionCallResults>
    {
        return Assertions.noReturn();
    }

    protected createUnmodifiedArgumentAssertion(parameterIndex : number, parameterName : string, originalValue : any) : IAssertion<IFunctionCallResults>
    {
        return Assertions.parameter(parameterIndex, parameterName, Assertions.unmodified(originalValue));
    }

    protected renderTestCaseHeader(expected : IFunctionCallResults, _metadata : META) : JSX.Element
    {
        const argumentsString = expected.argumentsBeforeCall.map( convertToString ).join(", ");
        const call = code(`${this.referenceName}(${argumentsString})`);

        return (
            <React.Fragment>
                {call}
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
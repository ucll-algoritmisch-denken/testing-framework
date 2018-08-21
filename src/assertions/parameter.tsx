import React from 'react';
import { IAssertion } from "./assertion";
import { FunctionCallResults, TypedFunctionCallResults } from "../function-util";
import { lift } from './lift';
import { box } from './box';


// TODO Remove untyped version
export function parameter(parameterIndex : number, parameterName : string, assertion : IAssertion<any>) : IAssertion<FunctionCallResults>
{
    const header = (
        <React.Fragment>
            Parameter {parameterName}
        </React.Fragment>
    );

    return box(header, lift<FunctionCallResults, any>(lifter, assertion));


    function lifter(fcr : FunctionCallResults)
    {
        if ( 0 <= parameterIndex && parameterIndex < fcr.argumentsAfterCall.length )
        {
            return fcr.argumentsAfterCall[parameterIndex];
        }
        else
        {
            throw new Error(`Invalid parameter index ${parameterIndex}; should be between 0 and ${fcr.argumentsAfterCall.length}`);
        }
    }
}

export function typedParameter<Ps extends any[], R>(parameterIndex : number, parameterName : string, assertion : IAssertion<any>) : IAssertion<TypedFunctionCallResults<Ps, R>>
{
    const header = (
        <React.Fragment>
            Parameter {parameterName}
        </React.Fragment>
    );

    return box(header, lift<TypedFunctionCallResults<Ps, R>, any>(lifter, assertion));


    function lifter(fcr : TypedFunctionCallResults<Ps, R>)
    {
        if ( 0 <= parameterIndex && parameterIndex < fcr.argumentsAfterCall.length )
        {
            return fcr.argumentsAfterCall[parameterIndex];
        }
        else
        {
            throw new Error(`Invalid parameter index ${parameterIndex}; should be between 0 and ${fcr.argumentsAfterCall.length}`);
        }
    }
}
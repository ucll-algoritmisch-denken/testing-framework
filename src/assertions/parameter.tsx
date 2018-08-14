import React from 'react';
import { IAssertion } from "./assertion";
import { FunctionCallResults } from "../function-util";
import { lift } from './lift';
import { box } from './box';


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
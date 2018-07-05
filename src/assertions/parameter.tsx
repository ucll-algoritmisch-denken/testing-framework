import React from 'react';
import { IAssertion } from "./assertion";
import { IFunctionCallResults } from "function-util";
import { lift } from './lift';
import { box } from './box';


export function parameter(parameterIndex : number, parameterName : string, assertion : IAssertion<any>) : IAssertion<IFunctionCallResults>
{
    const header = (
        <React.Fragment>
            Parameter {parameterName}
        </React.Fragment>
    );

    return box(header, lift<IFunctionCallResults, any>(lifter, assertion));


    function lifter(fcr : IFunctionCallResults)
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
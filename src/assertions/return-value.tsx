import React from 'react';
import { IAssertion } from "./assertion";
import { FunctionCallResults } from "function-util";
import { lift } from "./lift";
import { box } from './box';


export function returnValue(assertion : IAssertion<any>) : IAssertion<FunctionCallResults>
{
    const header = (
        <React.Fragment>
            Return value
        </React.Fragment>
    );

    return box(header, lift<FunctionCallResults, any>(lifter, assertion));


    function lifter(fcr : FunctionCallResults)
    {
        return fcr.returnValue;
    }
}
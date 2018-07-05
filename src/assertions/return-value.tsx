import React from 'react';
import { IAssertion } from "./assertion";
import { IFunctionCallResults } from "function-util";
import { lift } from "./lift";
import { box } from './box';


export function returnValue(assertion : IAssertion<any>) : IAssertion<IFunctionCallResults>
{
    const header = (
        <React.Fragment>
            Return value
        </React.Fragment>
    );

    return box(header, lift<IFunctionCallResults, any>(lifter, assertion));


    function lifter(fcr : IFunctionCallResults)
    {
        return fcr.returnValue;
    }
}
import React from 'react';
import { IAssertion } from "./assertion";
import { FunctionCallResults, TypedFunctionCallResults } from "../function-util";
import { lift } from "./lift";
import { box } from './box';


// TODO Remove untyped version
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

export function typedReturnValue<Ps extends any[], R>(assertion : IAssertion<R>) : IAssertion<TypedFunctionCallResults<Ps, R>>
{
    const header = (
        <React.Fragment>
            Return value
        </React.Fragment>
    );

    return box(header, lift(lifter, assertion));


    function lifter(fcr : TypedFunctionCallResults<Ps, R>)
    {
        return fcr.returnValue;
    }
}
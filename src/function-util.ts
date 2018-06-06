import { cloneDeep } from 'lodash';
import dedent from 'dedent';
import { Maybe } from './maybe';


export class FunctionInformation
{
    constructor(public readonly functionName : string, public readonly parameterNames : string[]) { }

    format() : string
    {
        const parameterString = this.parameterNames.join(", ");

        return `${this.functionName}(${parameterString})`;
    }
}

export function parseFunction(func : (...args : any[]) => any) : FunctionInformation
{
    let regex = /function (\w+)\((.*?)\)/;
    let groups = regex.exec(func.toString());

    if ( groups != null )
    {
        const functionName : string = groups[1];
        const parameterString : string = groups[2].trim();
        const parameterNames : string[] = [];

        if ( parameterString != '' )
        {
            for ( const parameter of parameterString.split(",") )
            {
                parameterNames.push(parameter.trim());
            }
        }

        return new FunctionInformation(functionName, parameterNames);
    }
    else
    {
        throw new Error("Could not parse function source");
    }
}

export interface IFunctionCallResults
{
    argumentsBeforeCall : any[];
    argumentsAfterCall : any[];
    returnValue : any;
}

export function callFunction(func : (...args : any[]) => any, ...args : any[]) : IFunctionCallResults
{
    const copiedArguments = cloneDeep(args);
    const returnValue = func(...copiedArguments);

    return {
        argumentsBeforeCall: args,
        argumentsAfterCall: copiedArguments,
        returnValue
    };
}

export function monadicCallFunction(func : Maybe<(...args : any[]) => any>, ...args : any[]) : Maybe<IFunctionCallResults>
{
    return func.bind(f => Maybe.of(callFunction(f, ...args)));
}

export interface INamedFunctionCallResults
{
    argumentsBeforeCall : { [key : string] : any };
    argumentsAfterCall : { [key : string] : any };
    returnValue : any;
}

export function nameResults(results : IFunctionCallResults, info : FunctionInformation)
{
    const argumentsBeforeCall = nameArguments(results.argumentsBeforeCall, info.parameterNames);
    const argumentsAfterCall = nameArguments(results.argumentsAfterCall, info.parameterNames);
    const returnValue = results.returnValue;

    return { argumentsBeforeCall, argumentsAfterCall, returnValue };


    function nameArguments(args : any[], names : string[]) : { [key : string] : any }
    {
        if ( args.length !== names.length )
        {
            throw new Error("Mismatch");
        }
        else
        {
            const result : { [key : string] : any } = {};

            for ( let i = 0; i !== args.length; ++i )
            {
                const name : string = names[i];
                const value : any = args[i];

                result[name] = value;
            }

            return result;
        }
    }
}

export function namedCallFunction(func : (...args : any[]) => any, ...args : any[]) : INamedFunctionCallResults
{
    const unnamed = callFunction(func, ...args);
    const info = parseFunction(func);
    const named = nameResults(unnamed, info);

    return named;
}

export function formatFunction(func : (...args : any[]) => any) : string
{
    return dedent(func.toString());
}
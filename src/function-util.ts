import { cloneDeep } from 'lodash';
import { IType } from './type';
import { Maybe } from 'maybe';
import { deepEqual } from './equality';
import { contains } from 'js-algorithms';


export class FunctionInformation
{
    constructor(public readonly functionName : string, public readonly parameterNames : string[]) { }

    get signature() : string
    {
        const parameterString = this.parameterNames.join(", ");

        return `${this.functionName}(${parameterString})`;
    }

    get parameterCount() : number
    {
        return this.parameterNames.length;
    }

    parameterWithNameExists(parameterName : string) : boolean
    {
        return contains(this.parameterNames, parameterName);
    }

    specifyTypes(parameterTypes : IType<any>[], returnType : IType<any>) : TypedFunctionInformation
    {
        return new TypedFunctionInformation(this.functionName, this.parameterNames, parameterTypes, returnType);
    }

    verifyCall(fcr : FunctionCallResults, ignoredParameters : string[] = []) : boolean
    {
        const r = callFunction(fcr.func, ...fcr.argumentsBeforeCall);

        if ( !deepEqual(fcr.returnValue, r.returnValue) )
        {
            return false;
        }
        else
        {
            return this.parameterNames.every( (parameterName, parameterIndex) => {
                if ( contains(ignoredParameters, parameterName) )
                {
                    return true;
                }
                else
                {
                    return deepEqual(fcr.argumentsAfterCall[parameterIndex], r.argumentsAfterCall[parameterIndex]);
                }
            } );
        }
    }
}

export class TypedFunctionInformation extends FunctionInformation
{
    constructor(functionName : string, parameterNames : string[], public readonly parameterTypes : IType<any>[], public readonly returnType : IType<any>)
    {
        super(functionName, parameterNames);

        if ( parameterNames.length !== parameterTypes.length )
        {
            throw new Error(`Parameter count mismatch`);
        }
    }
}

export function parseFunction<Ps extends any[], R>(func : (...args : Ps) => R) : FunctionInformation
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
        console.error(`Failed to parse\n${func.toString()}`);

        throw new Error("Could not parse function source");
    }
}

export class FunctionCallResults
{
    constructor(
        public readonly func : (...args : any[]) => any,
        public readonly argumentsBeforeCall : any[],
        public readonly argumentsAfterCall : any[],
        public returnValue : any
    ) { }

    public sameAs(that : FunctionCallResults) : boolean
    {
        return deepEqual(this.argumentsAfterCall, this.argumentsAfterCall) && deepEqual(this.returnValue, that.returnValue);
    }

    public get namedArgumentsBeforeCall() : { [key : string] : any }
    {
        return this.nameParameters(this.argumentsBeforeCall);
    }

    public get namedArgumentsAfterCall() : { [key : string] : any }
    {
        return this.nameParameters(this.argumentsAfterCall);
    }

    private nameParameters(parameterValues : any[]) : { [key : string] : any }
    {
        const parameterNames = parseFunction(this.func).parameterNames;

        if ( parameterNames.length !== parameterValues.length )
        {
            throw new Error(`Inconsistent number of parameters`);
        }
        else
        {
            const result : { [ key : string ] : any } = {};

            for ( let i = 0; i !== parameterNames.length; ++i )
            {
                const parameterName = parameterNames[i];
                const parameterValue = parameterValues[i];

                result[parameterName] = parameterValue;
            }

            return result;
        }
    }
}

export class TypedFunctionCallResults<Ps extends any[], R>
{
    constructor(
        public readonly func : (...args : Ps) => R,
        public readonly argumentsBeforeCall : Ps,
        public readonly argumentsAfterCall : Ps,
        public returnValue : R
    ) { }

    public sameAs(that : TypedFunctionCallResults<Ps, R>) : boolean
    {
        return deepEqual(this.argumentsAfterCall, this.argumentsAfterCall) && deepEqual(this.returnValue, that.returnValue);
    }

    public get namedArgumentsBeforeCall() : { [key : string] : any }
    {
        return this.nameParameters(this.argumentsBeforeCall);
    }

    public get namedArgumentsAfterCall() : { [key : string] : any }
    {
        return this.nameParameters(this.argumentsAfterCall);
    }

    private nameParameters(parameterValues : any[]) : { [key : string] : any }
    {
        const parameterNames = parseFunction(this.func as any).parameterNames;

        if ( parameterNames.length !== parameterValues.length )
        {
            throw new Error(`Inconsistent number of parameters`);
        }
        else
        {
            const result : { [ key : string ] : any } = {};

            for ( let i = 0; i !== parameterNames.length; ++i )
            {
                const parameterName = parameterNames[i];
                const parameterValue = parameterValues[i];

                result[parameterName] = parameterValue;
            }

            return result;
        }
    }
}

export function callFunction(func : (...args : any[]) => any, ...args : any[]) : FunctionCallResults
{
    const copiedArguments = cloneDeep(args);
    const returnValue = func(...copiedArguments);

    return new FunctionCallResults(func, args, copiedArguments, returnValue);
}

export function typedCallFunction<Ps extends any[], R>(func : (...args : Ps) => R, ...args : Ps) : TypedFunctionCallResults<Ps, R>
{
    const copiedArguments = cloneDeep(args);
    const returnValue = func(...copiedArguments);

    return new TypedFunctionCallResults(func, args, copiedArguments, returnValue);
}

export function monadicCallFunction(func : Maybe<(...args : any[]) => any>, ...args : any[]) : Maybe<FunctionCallResults>
{
    return func.bind(f => Maybe.just(callFunction(f, ...args)));
}

export interface INamedFunctionCallResults
{
    readonly argumentsBeforeCall : { [key : string] : any };
    readonly argumentsAfterCall : { [key : string] : any };
    readonly returnValue : any;
}

export function nameResults(results : FunctionCallResults, info : FunctionInformation)
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

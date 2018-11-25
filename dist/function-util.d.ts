import { IType } from './type';
import { Maybe } from 'maybe';
export declare class FunctionInformation {
    readonly functionName: string;
    readonly parameterNames: string[];
    constructor(functionName: string, parameterNames: string[]);
    readonly signature: string;
    readonly parameterCount: number;
    parameterWithNameExists(parameterName: string): boolean;
    specifyTypes(parameterTypes: IType<any>[], returnType: IType<any>): TypedFunctionInformation;
    verifyCall(fcr: FunctionCallResults, ignoredParameters?: string[]): boolean;
}
export declare class TypedFunctionInformation extends FunctionInformation {
    readonly parameterTypes: IType<any>[];
    readonly returnType: IType<any>;
    constructor(functionName: string, parameterNames: string[], parameterTypes: IType<any>[], returnType: IType<any>);
}
export declare function parseFunction<Ps extends any[], R>(func: (...args: Ps) => R): FunctionInformation;
export declare class FunctionCallResults {
    readonly func: (...args: any[]) => any;
    readonly argumentsBeforeCall: any[];
    readonly argumentsAfterCall: any[];
    returnValue: any;
    constructor(func: (...args: any[]) => any, argumentsBeforeCall: any[], argumentsAfterCall: any[], returnValue: any);
    sameAs(that: FunctionCallResults): boolean;
    readonly namedArgumentsBeforeCall: {
        [key: string]: any;
    };
    readonly namedArgumentsAfterCall: {
        [key: string]: any;
    };
    private nameParameters;
}
export declare class TypedFunctionCallResults<Ps extends any[], R> {
    readonly func: (...args: Ps) => R;
    readonly argumentsBeforeCall: Ps;
    readonly argumentsAfterCall: Ps;
    returnValue: R;
    constructor(func: (...args: Ps) => R, argumentsBeforeCall: Ps, argumentsAfterCall: Ps, returnValue: R);
    sameAs(that: TypedFunctionCallResults<Ps, R>): boolean;
    readonly namedArgumentsBeforeCall: {
        [key: string]: any;
    };
    readonly namedArgumentsAfterCall: {
        [key: string]: any;
    };
    private nameParameters;
}
export declare function callFunction(func: (...args: any[]) => any, ...args: any[]): FunctionCallResults;
export declare function typedCallFunction<Ps extends any[], R>(func: (...args: Ps) => R, ...args: Ps): TypedFunctionCallResults<Ps, R>;
export declare function monadicCallFunction(func: Maybe<(...args: any[]) => any>, ...args: any[]): Maybe<FunctionCallResults>;
export interface INamedFunctionCallResults {
    readonly argumentsBeforeCall: {
        [key: string]: any;
    };
    readonly argumentsAfterCall: {
        [key: string]: any;
    };
    readonly returnValue: any;
}
export declare function nameResults(results: FunctionCallResults, info: FunctionInformation): {
    argumentsBeforeCall: {
        [key: string]: any;
    };
    argumentsAfterCall: {
        [key: string]: any;
    };
    returnValue: any;
};
export declare function namedCallFunction(func: (...args: any[]) => any, ...args: any[]): INamedFunctionCallResults;
export declare function callIfDefined<Ps extends any[], R>(f: ((...args: Ps) => R) | undefined, ...args: Ps): (R | undefined);

import { IType } from './type';
import { Maybe } from 'maybe';
export declare class FunctionInformation {
    readonly functionName: string;
    readonly parameterNames: string[];
    constructor(functionName: string, parameterNames: string[]);
    format(): string;
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
export declare function parseFunction(func: (...args: any[]) => any): FunctionInformation;
export declare function parameterNames(func: (...args: any[]) => any): string[];
export declare class FunctionCallResults {
    readonly func: (...args: any[]) => any;
    readonly argumentsBeforeCall: any[];
    readonly argumentsAfterCall: any[];
    returnValue: any;
    constructor(func: (...args: any[]) => any, argumentsBeforeCall: any[], argumentsAfterCall: any[], returnValue: any);
    sameAs(that: FunctionCallResults): boolean;
}
export declare function callFunction(func: (...args: any[]) => any, ...args: any[]): FunctionCallResults;
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

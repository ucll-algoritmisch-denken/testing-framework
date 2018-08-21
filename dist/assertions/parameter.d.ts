import { IAssertion } from "./assertion";
import { FunctionCallResults, TypedFunctionCallResults } from "../function-util";
export declare function parameter(parameterIndex: number, parameterName: string, assertion: IAssertion<any>): IAssertion<FunctionCallResults>;
export declare function typedParameter<Ps extends any[], R>(parameterIndex: number, parameterName: string, assertion: IAssertion<any>): IAssertion<TypedFunctionCallResults<Ps, R>>;

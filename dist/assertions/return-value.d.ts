import { IAssertion } from "./assertion";
import { FunctionCallResults, TypedFunctionCallResults } from "../function-util";
export declare function returnValue(assertion: IAssertion<any>): IAssertion<FunctionCallResults>;
export declare function typedReturnValue<Ps extends any[], R>(assertion: IAssertion<R>): IAssertion<TypedFunctionCallResults<Ps, R>>;

import { SourceCode } from "./source-code";
export declare type Func<Ps extends any[], R> = (...args: Ps) => R;
declare const pack: unique symbol;
export declare abstract class Solution<Ps extends any[], R> {
    abstract readonly label: string;
    abstract readonly implementation: Func<Ps, R>;
    readonly sourceCode: SourceCode;
}
export interface ISolutionPack<Ps extends any[], R> {
    (...args: Ps): R;
    [pack]: Solution<Ps, R>[];
}
export declare type ParameterTypes<T> = T extends ISolutionPack<infer Ps, infer R> ? Ps : never;
export declare type ReturnType<T> = T extends ISolutionPack<infer Ps, infer R> ? R : never;
export declare function packSolutions<Ps extends any[], R>(...solutions: Solution<Ps, R>[]): ISolutionPack<Ps, R>;
export declare function isSolutionPack<Ps extends any[], R>(f: Func<Ps, R>): f is ISolutionPack<Ps, R>;
export declare function retrieveSolutions<Ps extends any[], R>(f: Func<Ps, R>): Solution<Ps, R>[];
export declare function convertSolutionsToSourceCodeMap<Ps extends any[], R>(solutions: Solution<Ps, R>[]): {
    [key: string]: SourceCode;
};
export {};

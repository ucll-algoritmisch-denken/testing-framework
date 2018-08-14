import { SourceCode } from "./source-code";
export declare type Func<Ps extends any[], R> = (...args: Ps) => R;
export declare abstract class Solution<Ps extends any[], R> {
    abstract readonly label: string;
    abstract readonly implementation: Func<Ps, R>;
    readonly sourceCode: SourceCode;
}
export interface ISolutionPack<Ps extends any[], R> {
    (...args: Ps): R;
    solutions: Solution<Ps, R>[];
}
export declare type ParameterTypes<T> = T extends ISolutionPack<infer Ps, infer R> ? Ps : never;
export declare type ReturnType<T> = T extends ISolutionPack<infer Ps, infer R> ? R : never;
export declare function packSolutions<Ps extends any[], R>(...solutions: Solution<Ps, R>[]): ISolutionPack<Ps, R>;

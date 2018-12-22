import { SourceCode } from "./source-code";
declare const pack: unique symbol;
export declare abstract class Solution<Ps extends any[], R> {
    abstract readonly label: string;
    abstract readonly implementation: (...args: Ps) => R;
    readonly dependencies: ((...args: any[]) => any)[];
    readonly sourceCode: SourceCode;
}
export interface ISolutionPack<Ps extends any[], R> {
    (...args: Ps): R;
    [pack]: Solution<Ps, R>[];
}
export declare type ParameterTypes<T> = T extends (...args: infer Ps) => infer _R ? Ps : never;
export declare type ReturnType<T> = T extends (...args: infer _Ps) => infer R ? R : never;
export declare function packSolutions<Ps extends any[], R>(...solutions: Solution<Ps, R>[]): ISolutionPack<Ps, R>;
export declare function packSingleSolution<Ps extends any[], R>(solution: (...args: Ps) => R, dependencies?: ((...args: any[]) => any)[], label?: string): ISolutionPack<Ps, R>;
export declare function isSolutionPack<Ps extends any[], R>(f: (...args: Ps) => R): f is ISolutionPack<Ps, R>;
export declare function retrieveSolutions<Ps extends any[], R>(f: (...args: Ps) => R): Solution<Ps, R>[];
export declare function convertSolutionsToSourceCodeMap<Ps extends any[], R>(solutions: Solution<Ps, R>[]): {
    [key: string]: SourceCode;
};
export {};

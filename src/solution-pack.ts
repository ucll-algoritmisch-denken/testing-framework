import { SourceCode, Language } from "./source-code";


export type Func<Ps extends any[], R> = (...args : Ps) => R;

export abstract class Solution<Ps extends any[], R>
{
    public abstract readonly label : string;

    public abstract readonly implementation : Func<Ps, R>;

    public get sourceCode() : SourceCode
    {
        return new SourceCode(Language.JavaScript, this.implementation.toString()).beautify();
    }
}

export interface ISolutionPack<Ps extends any[], R>
{
    (...args : Ps) : R;

    solutions : Solution<Ps, R>[];
}

export type ParameterTypes<T> = T extends ISolutionPack<infer Ps, infer R> ? Ps : never;

export type ReturnType<T> = T extends ISolutionPack<infer Ps, infer R> ? R : never;

export function packSolutions<Ps extends any[], R>(...solutions : Solution<Ps, R>[]) : ISolutionPack<Ps, R>
{
    const result : ISolutionPack<Ps, R> = solutions[0].implementation as ISolutionPack<Ps, R>;

    result.solutions = solutions;

    return result;
}
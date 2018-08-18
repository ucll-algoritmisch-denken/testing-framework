import { SourceCode, Language } from "./source-code";


export type Func<Ps extends any[], R> = (...args : Ps) => R;

const pack = Symbol(`implementations`);

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

    [pack] : Solution<Ps, R>[];
}

// export type ParameterTypes<T> = T extends ISolutionPack<infer Ps, infer R> ? Ps : never;

// export type ReturnType<T> = T extends ISolutionPack<infer Ps, infer R> ? R : never;

export type ParameterTypes<T> = T extends (...args : infer Ps) => infer R ? Ps : never;

export type ReturnType<T> = T extends (...args : infer Ps) => infer R ? R : never;

export function packSolutions<Ps extends any[], R>(...solutions : Solution<Ps, R>[]) : ISolutionPack<Ps, R>
{
    const result : ISolutionPack<Ps, R> = solutions[0].implementation as ISolutionPack<Ps, R>;

    result[pack] = solutions;

    return result;
}

export function isSolutionPack<Ps extends any[], R>(f : Func<Ps, R>) : f is ISolutionPack<Ps, R>
{
    return (f as any)[pack];
}

export function retrieveSolutions<Ps extends any[], R>(f : Func<Ps, R>) : Solution<Ps, R>[]
{
    if ( isSolutionPack(f) )
    {
        return f[pack];
    }
    else
    {
        const solution = new class extends Solution<Ps, R>
        {
            public label: string = '';
            
            public implementation: Func<Ps, R> = f;
        };

        return [ solution ];
    }
}

export function convertSolutionsToSourceCodeMap<Ps extends any[], R>(solutions : Solution<Ps, R>[]) : { [key : string] : SourceCode }
{
    const result : { [key : string] : SourceCode } = {};

    for ( let solution of solutions )
    {
        result[solution.label] = solution.sourceCode;
    }

    return result;
}
import React from 'react';
import { namedCallFunction, INamedFunctionCallResults } from 'function-util';
import { ISection } from 'chapter';
import { deepEqual } from 'equality';
import { IColumn, InterpretationExercise } from 'sections/exercises/interpretation/exercise';
import { difficulty } from 'difficulty';


export interface IBuilder
{
    header : JSX.Element;

    hint : JSX.Element | undefined;

    tocEntry : JSX.Element;

    difficulty ?: difficulty;

    explanations : JSX.Element;

    showSourceCode : boolean;

    addInput(...args : any[]) : void;

    requestReturnValue() : void;

    requestParameter(parameterName : string) : void;
}

class ReturnValueColumn implements IColumn
{
    get caption() : string
    {
        return 'return value';
    }

    validate(expected : INamedFunctionCallResults, input : string) : boolean
    {
        try
        {
            return deepEqual(eval(input), expected.returnValue);
        }
        catch ( _ )
        {
            return false;
        }
    }
}

class ParameterValueColumn implements IColumn
{
    constructor(private parameterName : string) { }

    get caption() : string
    {
        return this.parameterName;
    }

    validate(fcr : INamedFunctionCallResults, input : string) : boolean
    {
        const expected = fcr.argumentsAfterCall[this.parameterName];

        try
        {
            return deepEqual(eval(input), expected);
        }
        catch ( _ )
        {
            return false;
        }
    }
}



class InterpretationExerciseBuilder implements IBuilder
{
    private cases : INamedFunctionCallResults[];

    private columns : IColumn[];

    public header : JSX.Element;

    public hint : JSX.Element | undefined;

    public tocEntry : JSX.Element;

    public difficulty ?: difficulty;

    public explanations : JSX.Element;

    public showSourceCode : boolean;

    constructor(public id : string, private func : (...args : any[]) => any)
    {
        this.cases = [];
        this.columns = [];
        this.header = (
            <React.Fragment>
                Wat doet deze code?
            </React.Fragment>
        );
        this.tocEntry = (
            <React.Fragment>
                Interpretation
            </React.Fragment>
        );
        this.explanations = (
            <React.Fragment />
        );
        this.showSourceCode = true;
    }

    public addInput(...args : any[]) : void
    {
        const c = namedCallFunction(this.func, ...args);

        this.cases.push( c );
    }

    public requestReturnValue() : void
    {
        this.columns.push( new ReturnValueColumn() );
    }

    public requestParameter(parameterName : string) : void
    {
        this.columns.push( new ParameterValueColumn(parameterName) );
    }

    public build()
    {
        if ( !this.difficulty )
        {
            throw new Error(`Missing difficulty`);
        }
        else
        {
            return new InterpretationExercise(this.id, this.tocEntry, this.difficulty, this.header, this.explanations, this.func, this.showSourceCode, this.cases, this.columns, this.hint);
        }
    }
}

export function build(id : string, func : (...args : any[]) => any, b : (builder : IBuilder) => void) : ISection
{
    const builder = new InterpretationExerciseBuilder(id, func);

    b(builder);

    return builder.build();
}
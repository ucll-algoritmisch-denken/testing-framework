import React from 'react';
import { parseFunction, formatFunction, FunctionInformation, namedCallFunction, INamedFunctionCallResults } from 'function-util';
import { ISection, IScoredSection } from 'chapter';
import { ValidatedInput } from 'components/ValidatedInput';
import * as Formatters from 'formatters/jsx-formatters';
import { deepEqual } from 'equality';
import { SourceCodeViewer } from 'components/sourcecode-viewer';
import { HintViewer } from 'components/hint-viewer';
import './interpretation.scss';


export interface IBuilder
{
    header : JSX.Element;

    hint : JSX.Element | undefined;

    caption : JSX.Element;

    addInput(...args : any[]) : void;

    requestReturnValue() : void;

    requestParameter(parameterName : string) : void;
}

interface IColumn
{
    readonly caption : string;

    validate(expected : INamedFunctionCallResults, input : string) : boolean;
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

class InterpretationExercise implements ISection
{
    private readonly functionInformation : FunctionInformation;

    constructor(public tocEntry : JSX.Element, private header : JSX.Element, private func : (...args : any[]) => any, private cases : INamedFunctionCallResults[], private columns : IColumn[], private hint : JSX.Element | undefined)
    {
        this.functionInformation = parseFunction(func);
    }

    isScored() : this is IScoredSection
    {
        return false;
    }

    get content() : JSX.Element
    {
        const me = this;

        return (
            <section className='interpretation exercise'>
                <header>
                    {this.header}
                </header>
                <SourceCodeViewer sourceCode={createCode()} />
                {createForm()}
                {createHint()}
            </section>
        );


        function createHint()
        {
            if ( me.hint )
            {
                return (
                    <HintViewer>
                        {me.hint}
                    </HintViewer>
                );
            }
            else
            {
                return null;
            }
        }

        function createForm()
        {
            return (
                <table className='form'>
                    <tbody>
                        {createHeaders()}
                        {createRows()}
                    </tbody>
                </table>
            );


            function createHeaders()
            {
                const inputHeaders = me.functionInformation.parameterNames.map( (parameterName, index) => <th key={`input${index}`}>{parameterName}</th> );
                const outputHeaders = me.columns.map( (column, index) => <th key={`output${index}`}>{column.caption}</th>) ;

                return (
                    <tr>
                        {inputHeaders}
                        {outputHeaders}
                    </tr>
                );
            }

            function createRows()
            {
                return me.cases.map(createRow);
            }

            function createRow(fcr : INamedFunctionCallResults, index : number)
            {
                const inputs = me.functionInformation.parameterNames.map( parameterName => {
                    return (
                        <td key={`input${index}`}>
                            {Formatters.simple(fcr.argumentsBeforeCall[parameterName])}
                        </td>
                    );
                });

                const outputs = me.columns.map( (column, index) => {
                    return (
                        <td key={`output${index}`}>
                            <ValidatedInput validator={(input) => column.validate(fcr, input)} />
                        </td>
                    );
                });

                return (
                    <tr key={`row${index}`}>
                        {inputs}
                        {outputs}
                    </tr>
                );
            }
        }

        function createCode() : string
        {
            return formatFunction(me.func);
        }
    }
}

class InterpretationExerciseBuilder implements IBuilder
{
    private cases : INamedFunctionCallResults[];

    private columns : IColumn[];

    public header : JSX.Element;

    public hint : JSX.Element | undefined;

    public caption : JSX.Element;

    constructor(private func : (...args : any[]) => any)
    {
        this.cases = [];
        this.columns = [];
        this.header = (
            <React.Fragment>
                Wat doet deze code?
            </React.Fragment>
        );
        this.caption = (
            <React.Fragment>
                Interpretation
            </React.Fragment>
        );
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
        return new InterpretationExercise(this.caption, this.header, this.func, this.cases, this.columns, this.hint);
    }
}

export function build(func : (...args : any[]) => any, b : (builder : IBuilder) => void) : ISection
{
    const builder = new InterpretationExerciseBuilder(func);

    b(builder);

    return builder.build();
}
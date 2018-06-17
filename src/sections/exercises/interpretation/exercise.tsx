import React from 'react';
import { parseFunction, formatFunction, FunctionInformation, INamedFunctionCallResults } from 'function-util';
import { ValidatedInput } from 'components/ValidatedInput';
import * as Formatters from 'formatters/jsx-formatters';
import { SourceCodeViewer } from 'components/sourcecode-viewer';
import { HintViewer } from 'components/hint-viewer';
import { IScored } from 'score';
import { IHasDifficulty, difficulty } from 'difficulty';
import { Exercise } from 'sections/exercises/exercise';


export interface IColumn
{
    readonly caption : string;

    validate(expected : INamedFunctionCallResults, input : string) : boolean;
}

export class InterpretationExercise extends Exercise
{
    private readonly functionInformation : FunctionInformation;

    constructor(
        id : string,
        tocEntry : JSX.Element,
        public readonly difficulty : difficulty,
        private readonly header : JSX.Element,
        private readonly func : (...args : any[]) => any,
        private readonly cases : INamedFunctionCallResults[],
        private readonly columns : IColumn[],
        private readonly hint : JSX.Element | undefined)
    {
        super(id, tocEntry);
        
        this.functionInformation = parseFunction(func);
    }

    hasDifficulty() : this is IHasDifficulty
    {
        return true;
    }

    isScored() : this is IScored
    {
        return false;
    }

    get content() : JSX.Element
    {
        const me = this;

        return (
            <section className='interpretation exercise'>
                {createHeader()}
                <SourceCodeViewer sourceCode={createCode()} />
                {createForm()}
                {createHint()}
            </section>
        );


        function createHeader()
        {
            return me.createExerciseHeader(me.header);
        }

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
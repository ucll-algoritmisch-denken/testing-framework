import React from 'react';
import { parseFunction, FunctionInformation, INamedFunctionCallResults } from 'function-util';
import { ValidatedInput } from 'components/validated-input';
import * as Formatters from 'formatters/jsx-formatters';
import { SourceCodeViewer } from 'components/sourcecode-viewer';
import { HintViewer } from 'components/hint-viewer';
import { IScored } from 'score';
import { IHasDifficulty, difficulty } from 'difficulty';
import { Exercise } from 'sections/exercises/exercise';
import { ValidatedTable } from 'components';


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
        private readonly explanations : JSX.Element,
        private readonly func : (...args : any[]) => any,
        private readonly showSourceCode : boolean,
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
                {createExplanations()}
                {createSourceCodeViewer()}
                {createForm()}
                {createHint()}
            </section>
        );


        function createHeader()
        {
            return me.createExerciseHeader(me.header);
        }

        function createExplanations()
        {
            return me.createDescriptionContainer( me.explanations );
        }

        function createSourceCodeViewer()
        {
            if ( me.showSourceCode )
            {
                return (
                    <SourceCodeViewer sourceCode={createCode()} />
                );
            }
            else
            {
                return (
                    <React.Fragment />
                );
            }
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
                <table className={ValidatedTable.className}>
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
            return me.func.toString();
        }
    }
}
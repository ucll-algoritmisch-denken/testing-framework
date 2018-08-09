import React from 'react';
import { Exercise as CodingExercise } from '../exercise';
import { ITestCase } from '../test-case';
import { ITestCaseInput } from './test-case-input';
import { FunctionInformation, IFunctionCallResults, callFunction, parseFunction } from '../../../../function-util';
import { Maybe } from 'maybe';
import { code } from '../../../../formatters/jsx-formatters';
import { SourceCode, Language } from '../../../../source-code';


export abstract class Exercise<META = {}> extends CodingExercise
{
    private __referenceInformation ?: FunctionInformation;

    protected abstract referenceImplementation : (...args : any[]) => any;

    protected abstract testedImplementation : Maybe<(...args : any[]) => any>;

    protected abstract generateTestCaseInputs() : Iterable<ITestCaseInput<META>>;

    protected abstract createTestCaseFromInputs(expected : IFunctionCallResults, actual : Maybe<IFunctionCallResults>, metadata : META) : ITestCase;

    protected get solutions() : { [key : string] : SourceCode }
    {
        return { 'solution': new SourceCode(Language.JavaScript, this.referenceImplementation.toString() ) };
    }

    protected get htmlClasses() : string[]
    {
        return super.htmlClasses.concat('reference-based');
    }

    protected *generateTestCases() : Iterable<ITestCase>
    {
        for ( let testCaseInput of this.generateTestCaseInputs() )
        {
            const expected = callFunction(this.referenceImplementation, ...testCaseInput.args);
            const actual = this.testedImplementation.lift( f => callFunction(f, ...testCaseInput.args) );

            yield this.createTestCaseFromInputs(expected, actual, testCaseInput.meta);
        }
    }

    public get id() : string
    {
        return this.referenceInformation.functionName;
    }

    public get header() : JSX.Element
    {
        return code(this.referenceInformation.format());
    }

    public get tocEntry() : JSX.Element
    {
        return (
            <React.Fragment>
                {this.referenceInformation.functionName}
            </React.Fragment>
        );
    }

    protected get referenceInformation() : FunctionInformation
    {
        return this.__referenceInformation = (this.__referenceInformation || parseFunction(this.referenceImplementation));
    }
}
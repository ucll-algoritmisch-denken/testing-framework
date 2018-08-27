import React from 'react';
import { Exercise as CodingExercise } from '../exercise';
import { ITestCase } from '../test-case';
import { ITestCaseInput } from './test-case-input';
import { FunctionInformation, FunctionCallResults, callFunction, parseFunction } from '../../../../function-util';
import { Maybe } from 'maybe';
import { code } from '../../../../formatters/jsx-formatters';
import { SourceCode, Language } from '../../../../source-code';
import { Outcome } from '../../../../outcome';
import { configuration } from '../../../../configuration';
import { Solution } from '../../../../solution-pack';


export abstract class Exercise<META = {}> extends CodingExercise
{
    private __referenceInformation ?: FunctionInformation;

    protected abstract referenceImplementations : ((...args : any[]) => any)[];

    protected abstract testedImplementation : Maybe<(...args : any[]) => any>;

    protected abstract generateTestCaseInputs() : Iterable<ITestCaseInput<META>>;

    protected abstract createTestCaseFromInputs(expected : FunctionCallResults, actual : Maybe<FunctionCallResults>, metadata : META) : ITestCase;

    protected get solutions() : Solution<any[], any>[]
    {
        if ( this.referenceImplementations.length === 0 )
        {
            throw new Error(`Need at least one reference implementation`);
        }
        else
        {
            const label = 'solution';
            const implementation : (...args : any[]) => any = this.referenceImplementations[0];
            
            const solution = new class extends Solution<any[], any>
            {
                label = label;
                
                implementation = implementation;
            };

            return [ solution ];
        }
    }

    protected get htmlClasses() : string[]
    {
        return super.htmlClasses.concat('reference-based');
    }

    protected *generateTestCases() : Iterable<ITestCase>
    {
        if ( this.referenceImplementations.length === 0 )
        {
            throw new Error(`Need at least one reference implementation`);
        }
        else
        {
            const referenceImplementation = this.referenceImplementations[0];

            for ( let testCaseInput of this.generateTestCaseInputs() )
            {
                this.checkThatSolutionsYieldSameResults(testCaseInput);

                const expected = callFunction(referenceImplementation, ...testCaseInput.args);
                const actual = this.testedImplementation.lift( f => callFunction(f, ...testCaseInput.args) );

                yield this.createTestCaseFromInputs(expected, actual, testCaseInput.meta);
            }
        }
    }

    public get id() : string
    {
        return this.referenceInformation.functionName;
    }

    public get header() : JSX.Element
    {
        return code(this.referenceInformation.signature);
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
        if ( this.referenceImplementations.length === 0 )
        {
            throw new Error(`Need at least one reference implementation`);
        }
        else
        {
            const referenceImplementation = this.referenceImplementations[0];

            return this.__referenceInformation = (this.__referenceInformation || parseFunction(referenceImplementation));
        }
    }

    protected checkThatSolutionsYieldSameResults(testCaseInput : ITestCaseInput<META>) : void
    {
        if ( configuration.verifySolutions )
        {
            const referenceImplementation = this.referenceImplementations[0];
            const expected = callFunction(referenceImplementation, ...testCaseInput.args);

            for ( let i = 1; i < this.referenceImplementations.length; ++i )
            {
                const alternativeImplementation = this.referenceImplementations[i];
                const actual = callFunction(alternativeImplementation, ...testCaseInput.args);
                const testCase = this.createTestCaseFromInputs(expected, Maybe.just(actual), testCaseInput.meta);

                if ( testCase.outcome !== Outcome.Pass )
                {
                    const referenceSourceCode = new SourceCode(Language.JavaScript, referenceImplementation.toString()).beautify();
                    const alternativeSourceCode  = new SourceCode(Language.JavaScript, alternativeImplementation.toString()).beautify();

                    console.log(`${referenceSourceCode.sourceCode}\ndisagrees with\n${alternativeSourceCode.sourceCode}`);

                    throw new Error(`Solutions don't agree!`);
                }
            }
        }
    }
}
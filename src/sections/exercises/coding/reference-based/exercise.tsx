import React from 'react';
import { Exercise as CodingExercise } from '../exercise';
import { ITestCase } from '../test-case';
import { ITestCaseInput } from './test-case-input';
import { FunctionInformation, IFunctionCallResults, callFunction, parseFunction } from '../../../../function-util';
import { Maybe } from '../../../../monad';
import { code } from '../../../../formatters/jsx-formatters';



export abstract class Exercise<META = {}> extends CodingExercise
{
    private __referenceInformation ?: FunctionInformation;

    protected abstract referenceImplementation : (...args : any[]) => any;

    protected abstract testedImplementation : Maybe<(...args : any[]) => any>;

    protected abstract generateTestCaseInputs() : Iterable<ITestCaseInput<META>>;

    protected abstract createTestCaseFromInputs(expected : IFunctionCallResults, actual : Maybe<IFunctionCallResults>, metadata : META) : ITestCase;
    
    protected get solution() : string | null
    {
        return this.referenceImplementation.toString();
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

    // TODO Remove
    protected get referenceName() : string
    {
        return this.referenceInformation.functionName;
    }

    // TODO Remove
    protected get referenceSignature() : string
    {
        return this.referenceInformation.format();
    }

    protected referenceParameterName(parameterIndex : number) : string
    {
        const minimum = 0;
        const maximum = this.referenceInformation.parameterNames.length;

        if ( minimum <= parameterIndex && parameterIndex < maximum )
        {
            return this.referenceInformation.parameterNames[parameterIndex];
        }
        else
        {
            throw new Error(`Invalid parameter index: should be ${minimum} <= i < ${maximum}`);
        }
    }
}
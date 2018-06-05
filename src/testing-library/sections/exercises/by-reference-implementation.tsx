import React from 'react';
import { ISection } from 'testing-library/chapter';
import 'testing-library/sections/exercises/coding.scss';
import { isUndefined } from 'testing-library/type';
import * as Assertions from 'testing-library/assertions';
import { simple, code } from 'testing-library/formatters/jsx-formatters';
import { IFunctionCallResults, callFunction, parseFunction, monadicCallFunction, formatFunction, FunctionInformation, nameResults } from 'testing-library/function-util';
import * as CodingExercise from 'testing-library/sections/exercises/coding';
import { IMaybe } from 'testing-library/maybe';
import { convertToString } from 'testing-library/formatters/string-formatters';


export interface IByReferenceImplementationBuilder
{
    addInput(...args : any[]) : void;

    returnValue( options ?: { 
        assertionConstructor ?: (expected : IFunctionCallResults, testCaseIndex : number) => Assertions.IAssertion
    } ) : void;

    parameter( parameterName : string, options ?: { 
        assertionConstructor ?: (expected : IFunctionCallResults, testCaseIndex : number) => Assertions.IAssertion
    } ) : void;
}

class ByReferenceImplementationBuilder implements IByReferenceImplementationBuilder
{
    private cases : IFunctionCallResults[];

    private testCaseBuilder : (index : number, tcb : CodingExercise.TestCaseBuilder, reference : IFunctionCallResults, tested : IMaybe<IFunctionCallResults>) => void;

    private referenceFunctionInformation : FunctionInformation;

    constructor(
        private description : JSX.Element,
        private referenceImplementation : (...args : any[]) => any,
        private testedImplementation : IMaybe<(...args : any[]) => any>,
        private headerGenerator : (expected: IFunctionCallResults) => JSX.Element,
        private showSolution : boolean)
    {
        this.cases = [];
        this.testCaseBuilder = (_) => {};
        this.referenceFunctionInformation = parseFunction(referenceImplementation);
    }

    addInput(...args : any[]) : void
    {
        const results = callFunction(this.referenceImplementation, ...args);

        this.cases.push(results);
    }

    returnValue( options ?: { 
        assertionConstructor ?: (expected : IFunctionCallResults, testCaseIndex : number) => Assertions.IAssertion,
     } )
    {
        options = options || {};
        const assertionConstructor = options.assertionConstructor || defaultAssertionConstructor;
        const oldBuilder = this.testCaseBuilder;
        this.testCaseBuilder = newBuilder;


        function newBuilder(testCaseIndex : number, tcb : CodingExercise.TestCaseBuilder, expected : IFunctionCallResults, actual : IMaybe<IFunctionCallResults>) : void
        {
            oldBuilder(testCaseIndex, tcb, expected, actual);

            const assertion = assertionConstructor(expected, testCaseIndex);
            const result = assertion.check(actual.lift(x => x.returnValue));

            tcb.addReturnValueAssertionResult(result);
        }

        function defaultAssertionConstructor(expected : IFunctionCallResults) : Assertions.IAssertion
        {
            return Assertions.createEqualityAssertion(expected.returnValue);
        }
    }

    parameter(parameterName : string, options ?: { 
        assertionConstructor ?: (expected : IFunctionCallResults, testCaseIndex : number) => Assertions.IAssertion,
    })
    {
        const me = this;
        options = options || {};
        const assertionConstructor = options.assertionConstructor || defaultAssertionConstructor;
        const oldBuilder = this.testCaseBuilder;
        this.testCaseBuilder = newBuilder;        


        function newBuilder(testCaseIndex : number, tcb : CodingExercise.TestCaseBuilder, expected : IFunctionCallResults, actual : IMaybe<IFunctionCallResults>) : void
        {
            oldBuilder(testCaseIndex, tcb, expected, actual);

            const namedActual = actual.lift(x => nameResults(x, me.referenceFunctionInformation));
            const assertion = assertionConstructor(expected, testCaseIndex);
            const result = assertion.check(namedActual.lift(x => x.argumentsAfterCall['parameterName']));

            tcb.addParameterValueAssertion(parameterName, result);
        }

        function defaultAssertionConstructor(expected : IFunctionCallResults, _testCaseIndex : number) : Assertions.IAssertion
        {
            const namedExpected = nameResults(expected, me.referenceFunctionInformation);

            return Assertions.createEqualityAssertion(namedExpected.argumentsAfterCall[parameterName], {
                original: namedExpected.argumentsBeforeCall[parameterName]
            });
        }
    }

    build() : ISection
    {
        return CodingExercise.build( parseFunction(this.referenceImplementation).functionName, builder => {
            builder.description = this.description;

            if ( this.showSolution )
            {
                builder.solution = formatFunction(this.referenceImplementation);
            }

            for ( let testCaseIndex = 0; testCaseIndex !== this.cases.length; ++testCaseIndex )
            {
                const expected = this.cases[testCaseIndex];
                const actual = monadicCallFunction(this.testedImplementation, ...expected.argumentsBeforeCall);

                builder.addTestCase( tcb => {
                    tcb.header = this.headerGenerator(expected);
                    this.testCaseBuilder(testCaseIndex, tcb, expected, actual);
                });
            }
        });
    }
}

export function build( args : {
    description : JSX.Element,
    referenceImplementation : (...args : any[]) => any, 
    testedImplementation : IMaybe<((...args : any[]) => any)>,
    headerGenerator ?: (expected: IFunctionCallResults) => JSX.Element,
    showSolution ?: boolean },
    func : (b : IByReferenceImplementationBuilder) => void ) : ISection
{
    const headerGenerator = args.headerGenerator || defaultHeaderGenerator;
    const showSolution = isUndefined(args.showSolution) ? true : args.showSolution;
    const builder = new ByReferenceImplementationBuilder(args.description, args.referenceImplementation, args.testedImplementation, headerGenerator, showSolution);

    func(builder);

    return builder.build();


    function defaultHeaderGenerator(expected : IFunctionCallResults) : JSX.Element
    {
        const parsed = parseFunction(args.referenceImplementation);
        const argumentsString = expected.argumentsBeforeCall.map( arg => convertToString(arg) ).join(", ");

        return (
            <React.Fragment>
                {code(`${parsed.functionName}(${argumentsString})`)} should return {code(simple(expected.returnValue))}.
            </React.Fragment>
        );
    }
}
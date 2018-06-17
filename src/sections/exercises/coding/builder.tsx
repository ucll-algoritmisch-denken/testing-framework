import React from 'react';
import { ISection } from 'chapter';
import { isInteger } from 'type';
import { IResult } from 'assertions';
import { Outcome, combineAssertionOutcomes, outcomeToHtmlClass } from 'outcome';
import { jsxify } from 'formatters/jsx-formatters';
import { CodingExercise, ITestCase } from 'sections/exercises/coding/exercise';
import { difficulty } from 'difficulty';


export interface IBuilder
{
    description: string | JSX.Element | undefined;

    header : JSX.Element;

    solution ?: string;

    tocEntry : JSX.Element;

    difficulty : difficulty;

    addTestCase(func : (tcb : ITestCaseBuilder) => void) : void;

    build() : ISection;
}

export interface ITestCaseBuilder
{
    header : string | JSX.Element | undefined;

    addReturnValueAssertionResult(assertion : IResult) : void;

    addParameterValueAssertion(name : string, assertion : IResult) : void;
}


class TestCase implements ITestCase
{
    constructor(public header : JSX.Element, public body : JSX.Element, public result : Outcome) { }
}

class CodingExerciseBuilder implements IBuilder
{
    private readonly testCases : TestCase[];

    public description: string | JSX.Element | undefined;

    public header : JSX.Element;

    public solution ?: string;

    public tocEntry : JSX.Element;

    private __difficulty ?: number;

    public set difficulty(value : number)
    {
        if ( !isInteger(value) )
        {
            throw new Error("Difficulty should be integral");
        }
        else
        {
            this.__difficulty = value;
        }
    }

    constructor(private readonly id : string, testedFunctionName : string)
    {
        this.testCases = [];
        this.tocEntry = (
            <React.Fragment>
                {testedFunctionName}
            </React.Fragment>
        );
        this.header = (
            <React.Fragment>
                {testedFunctionName}
            </React.Fragment>
        );
    }

    addTestCase(func : (tcb : TestCaseBuilder) => void) : void
    {
        const builder = new TestCaseBuilder();

        func(builder);

        this.testCases.push(builder.build());
    }

    build() : ISection
    {
        if ( !this.description )
        {
            throw new Error(`Missing description`);
        }
        else if ( !this.__difficulty )
        {
            throw new Error(`Missing difficilty`);
        }
        else
        {
            const description = jsxify(this.description);

            return new CodingExercise(this.id, this.tocEntry, this.__difficulty, this.header, description, this.testCases, this.solution);
        }
    }
}

class TestCaseBuilder
{
    private readonly assertions : IResult[];

    constructor()
    {
        this.assertions = [];
    }

    header : string | JSX.Element | undefined;

    addReturnValueAssertionResult(assertion : IResult) : void
    {
        const content = (
            <section className={determineClassName()} key="return-value-assertion">
                <header>
                    Return value
                </header>
                <div className="assertion-content">
                    {assertion.content}
                </div>
            </section>
        );

        const wrappedAssertion : IResult = {
            result: assertion.result,
            content
        };

        this.assertions.push(wrappedAssertion);


        function determineClassName()
        {
            return `assertion ${outcomeToHtmlClass(assertion.result)}`;
        }
    }

    addParameterValueAssertion(name : string, assertion : IResult) : void
    {
        const content = (
            <section className={determineClassName()} key={`parameter-${name}-assertion`}>
                <header>
                    Parameter {name}
                </header>
                <div className="assertion-content">
                    {assertion.content}
                </div>
            </section>
        );

        const wrappedAssertion : IResult = {
            result: assertion.result,
            content
        };

        this.assertions.push(wrappedAssertion);


        function determineClassName()
        {
            return `assertion ${outcomeToHtmlClass(assertion.result)}`;
        }
    }

    build() : TestCase
    {
        if ( !this.header )
        {
            throw new Error(`Missing header`);
        }
        else
        {
            if ( this.assertions.length === 0 )
            {
                throw new Error("Missing assertions");
            }
            else
            {
                const header = jsxify(this.header);
                const body = (
                    <div className="assertions">
                        {this.assertions.map(assertion => assertion.content)}
                    </div>
                );
                const result = combineAssertionOutcomes( this.assertions.map(assertion => assertion.result) );

                return new TestCase(header, body, result);
            }
        }
    }
}

export function build(testedFunctionName : string, b : (builder : IBuilder) => void) : ISection
{
    const builder = new CodingExerciseBuilder(testedFunctionName, testedFunctionName);

    b(builder);

    return builder.build();
}

import React from 'react';
import Collapsible from 'react-collapsible';
import { ISection } from '../../chapter';
import { Score } from '../../score';
import { isUndefined } from '../../type';
import { IResult } from '../../assertions';
import { Outcome, combineAssertionOutcomes, outcomeToHtmlClass } from '../../outcome';
import { jsxify } from '../../formatters/jsx-formatters';
import { SolutionViewer } from '../../components/solution-viewer';
import { Exercise } from '../../sections/exercises/exercise';
import './coding.scss';


export interface IBuilder
{
    description: string | JSX.Element | undefined;

    header : JSX.Element;

    solution ?: string;

    tocEntry : JSX.Element;

    addTestCase(func : (tcb : ITestCaseBuilder) => void) : void;

    build() : ISection;
}

export interface ITestCaseBuilder
{
    header : string | JSX.Element | undefined;

    addReturnValueAssertionResult(assertion : IResult) : void;

    addParameterValueAssertion(name : string, assertion : IResult) : void;
}


export interface ITestCase
{
    readonly header : JSX.Element;

    readonly body : JSX.Element;

    readonly result : Outcome;
}

class TestCase implements ITestCase
{
    constructor(public header : JSX.Element, public body : JSX.Element, public result : Outcome) { }
}

class CodingExercise extends Exercise
{
    constructor(
        id : string,
        tocEntry : JSX.Element,
        private readonly header : JSX.Element,
        private readonly description : JSX.Element,
        private readonly testCases : ITestCase[],
        private readonly solution ?: string)
    {
        super(id, tocEntry);
    }

    get content() : JSX.Element
    {
        const me = this;
        const contents = (
            <React.Fragment>
                <header>
                    {this.header}
                </header>
                {this.createDescriptionContainer(this.description)}
                {this.createTestCasesContainer(visualizeTestCases())}
                {createSolution()}
            </React.Fragment>
        );

        return this.createExerciseContainer("coding", contents);


        function createSolution()
        {
            if ( isUndefined(me.solution) )
            {
                return <React.Fragment />;
            }
            else
            {
                return <SolutionViewer sourceCode={me.solution} />;
            }
        }

        function visualizeTestCases()
        {
            return (
                <React.Fragment>
                    {me.testCases.map(visualizeTestCase)}
                </React.Fragment>
            );

            function visualizeTestCase(testCase : ITestCase, index : number)
            {
                const contents = (
                    <Collapsible trigger={createHeader()} transitionTime={100}>
                        {testCase.body}
                    </Collapsible>
                );

                return me.createTestCaseContainer(testCase.result, contents);


                function createHeader()
                {
                    return (
                        <div className={determineHeaderClassName()}>
                            {testCase.header}
                        </div>
                    );


                    function determineHeaderClassName()
                    {
                        return `header ${outcomeToHtmlClass(testCase.result)}`;
                    }
                }

                function determineTestCaseClassName()
                {
                    return `test-case ${outcomeToHtmlClass(testCase.result)}`;
                }
            }
        }
    }

    get score() : Score
    {
        if ( this.testCases.every(testCase => testCase.result === Outcome.Pass) )
        {
            return new Score(1, 1);
        }
        else
        {
            return new Score(0, 1);
        }
    }
}

class CodingExerciseBuilder implements IBuilder
{
    private readonly testCases : TestCase[];

    public description: string | JSX.Element | undefined;

    public header : JSX.Element;

    public solution ?: string;

    public tocEntry : JSX.Element;

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
        else
        {
            const description = jsxify(this.description);

            return new CodingExercise(this.id, this.tocEntry, this.header, description, this.testCases, this.solution);
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

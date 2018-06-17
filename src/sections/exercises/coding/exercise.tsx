import React from 'react';
import Collapsible from 'react-collapsible';
import { Score, IScored } from 'score';
import { isUndefined } from 'type';
import { Outcome, outcomeToHtmlClass } from 'outcome';
import { SolutionViewer } from 'components/solution-viewer';
import { Exercise } from 'sections/exercises/exercise';
import { IHasDifficulty, difficulty } from 'difficulty';


export interface ITestCase
{
    readonly header : JSX.Element;

    readonly body : JSX.Element;

    readonly result : Outcome;
}
export class CodingExercise extends Exercise implements IScored, IHasDifficulty
{
    constructor(
        id : string,
        tocEntry : JSX.Element,
        public readonly difficulty : difficulty,
        private readonly header : JSX.Element,
        private readonly description : JSX.Element,
        private readonly testCases : ITestCase[],
        private readonly solution ?: string)
    {
        super(id, tocEntry);
    }

    isScored() : this is IScored
    {
        return true;
    }

    hasDifficulty() : this is IHasDifficulty
    {
        return true;
    }

    get content() : JSX.Element
    {
        const me = this;
        const contents = (
            <React.Fragment>
                {this.createExerciseHeader(this.header)}
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
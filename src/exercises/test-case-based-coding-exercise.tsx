import React from 'react';
import { IExercise } from './exercise';
import { Score } from 'score';
import { Outcome, combineAssertionOutcomes, outcomeToHtmlClass } from 'outcome';
import { Lazy } from 'lazy';
import classNames from 'classnames';
import { ITestCase } from './test-case';


export abstract class TestCaseBasedCodingExercise implements IExercise
{
    /**
     * Generates test cases.
     */
    protected abstract generateTestCases() : Iterable<ITestCase>;

    protected abstract readonly maximumScore : number;
    
    constructor()
    {
        this.cachedScore = new Lazy<Score>(() => this.computeScore());
    }

    private cachedScore : Lazy<Score>;

    /**
     * Returns maximum score if all test cases succeed, 0 otherwise.
     * 
     * Do not override. Override computeScore() instead.
     */
    public get score() : Score
    {
        return this.cachedScore.value;
    }

    protected computeScore() : Score
    {
        const outcomes = Array.from(this.generateTestCases()).map(testCase => testCase.outcome);
        const outcome = combineAssertionOutcomes(outcomes);

        if ( outcome === Outcome.Pass )
        {
            return new Score(this.maximumScore, this.maximumScore);
        }
        else
        {
            return new Score(0, this.maximumScore);
        }
    }

    public render() : JSX.Element
    {
        const testCases = Array.from(this.generateTestCases()).map( (testCase, testCaseIndex) => {
            return (
                <React.Fragment key={`test-case-${testCaseIndex}`}>
                    {this.renderTestCase(testCase)}
                </React.Fragment>
            );
        });

        return (
            <div className="test-cases">
                {testCases}
            </div>
        );
    }

    protected renderTestCase(testCase : ITestCase) : JSX.Element
    {
        const htmlClass = classNames('test-case', outcomeToHtmlClass(testCase.outcome));

        return (
            <div className={htmlClass}>
                {testCase.render()}
            </div>
        );
    }
}
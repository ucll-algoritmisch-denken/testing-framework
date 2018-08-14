import React from 'react';
import classNames from 'classnames';
import { Exercise as BaseExercise } from "../exercise";
import { ITestCase } from './test-case';
import { IScored, Score } from '../../../score';
import { IHasDifficulty, difficulty } from '../../../difficulty';
import { Outcome, combineAssertionOutcomes, outcomeToHtmlClass } from '../../../outcome';
import { HintViewer, MultiSolutionViewer } from '../../../components';
import { SourceCode } from '../../../source-code';
import { Lazy } from '../../../lazy';


export abstract class Exercise extends BaseExercise implements IHasDifficulty, IScored
{
    protected abstract readonly description : JSX.Element;

    protected abstract generateTestCases() : Iterable<ITestCase>;

    protected get hint() : JSX.Element | null { return null; }

    protected abstract readonly solutions : { [key : string] : SourceCode };

    public abstract readonly difficulty : difficulty;

    private _score : Lazy<Score>;

    constructor()
    {
        super();

        this._score = new Lazy(() => this.computeScore());
    }
    
    public hasDifficulty() : this is IHasDifficulty
    {
        return true;
    }

    public isScored() : this is IScored
    {
        return true;
    }

    protected get maximumScore() : number
    {
        return 1;
    }

    /**
     * Do not override! Override computeScore() instead.
     */
    public get score() : Score
    {
        return this._score.value;
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

    protected get exerciseContent() : JSX.Element
    {
        return (
            <React.Fragment>
                {this.renderDescription()}
                {this.renderTestCases()}
                {this.renderHint()}
                {this.renderSolution()}
            </React.Fragment>
        );
    }

    protected renderDescription() : JSX.Element
    {
        return (
            <div className="description">
                {this.description}
            </div>
        );
    }

    protected renderTestCases() : JSX.Element
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

    protected renderHint() : JSX.Element
    {
        if ( this.hint )
        {
            return (
                <HintViewer>
                    {this.hint}
                </HintViewer>
            );
        }
        else
        {
            return <React.Fragment />;
        }
    }

    protected renderSolution() : JSX.Element
    {
        return (
            <MultiSolutionViewer solutions={this.solutions} />
        );
    }

    protected get htmlClasses() : string[]
    {
        return super.htmlClasses.concat('coding');
    }
}
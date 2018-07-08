import React from 'react';
import classNames from 'classnames';
import Collapsible from 'react-collapsible';
import { Exercise as BaseExercise } from "../exercise";
import { outcomeToHtmlClass, combineAssertionOutcomes, Outcome } from '../../../outcome';
import { HintViewer, SolutionViewer } from '../../../components';
import { ITestCase } from './test-case';
import { IHasDifficulty, difficulty } from '../../../difficulty';
import { IScored, Score } from '../../../score';


export abstract class Exercise extends BaseExercise implements IHasDifficulty, IScored
{
    protected abstract readonly description : JSX.Element;

    protected abstract generateTestCases() : Iterable<ITestCase>;

    protected get hint() : JSX.Element | null { return null; }

    protected get solution() : string | null { return null; }

    public abstract readonly difficulty : difficulty;
    
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

    public get score() : Score
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

    get exerciseContent() : JSX.Element
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
                <Collapsible trigger={testCase.header} transitionTime={100}>
                    {testCase.content}
                </Collapsible>
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
        if ( this.solution )
        {
            return (
                <SolutionViewer sourceCode={this.solution} />
            );
        }
        else
        {
            return <React.Fragment />;
        }
    }

    protected get htmlClasses() : string[]
    {
        return super.htmlClasses.concat('coding');
    }
}
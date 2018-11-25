import React from 'react';
import { ISection } from '../chapter';
import { ISolutionPack, isSolutionPack, retrieveSolutions, convertSolutionsToSourceCodeMap, Solution } from '../solution-pack';
import { parseFunction } from '../function-util';
import { IHasDifficulty } from '../difficulty';
import { IScored, Score } from '../score';
import classNames from 'classnames';
import { DifficultyViewer, MultiSolutionViewer, HintViewer } from '../components';
import { ExerciseSection } from './exercise-section';
import { Lazy } from '../lazy';
import { SourceCode } from '../source-code';
import { ReferenceImplementationBasedCodingExercise } from '../exercises/reference-implementation-based-coding-exercise';


type Exercise<Ps extends any[], R, META> = ReferenceImplementationBasedCodingExercise<Ps, R, META>;


export abstract class ReferenceBasedCodingExerciseSection<Ps extends any[], R, META = {}> extends ExerciseSection
{
    public abstract readonly difficulty : number;

    protected abstract createExercise() : Exercise<Ps, R, META>;

    protected abstract readonly description : JSX.Element;

    private readonly cachedExercise : Lazy<Exercise<Ps, R, META>>;

    public constructor()
    {
        super();

        this.cachedExercise = new Lazy<Exercise<Ps, R, META>>( () => this.createExercise() );
    }

    /**
     * Do not override. Override createExercise() instead.
     */
    protected get exercise() : Exercise<Ps, R, META>
    {
        return this.cachedExercise.value;
    }

    public get id() : string
    {
        const functionName = parseFunction(this.cachedExercise.value.referenceImplementation).functionName;

        return functionName;
    }

    public isScored(): this is IScored
    {
        return true;
    }

    hasDifficulty(): this is IHasDifficulty
    {
        return true;
    }

    public get score() : Score
    {
        return this.exercise.score;
    }

    public get caption() : string
    {
        return this.id;
    }

    protected get exerciseContent() : JSX.Element
    {
        return (
            <React.Fragment>
                {this.renderDescription()}
                {this.exercise.render()}
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
        const solutions : Solution<any[], any>[] = this.solutions as any;

        return (
            <MultiSolutionViewer solutions={solutions} />
        );
    }

    protected get htmlClasses() : string[]
    {
        return [ ...super.htmlClasses, 'coding' ];
    }

    protected get hint() : JSX.Element | null { return null; }

    protected get solutions() : Solution<Ps, R>[]
    {
        const referenceImplementation = this.exercise.referenceImplementation;
        const solutions = retrieveSolutions(referenceImplementation);

        return solutions;
    }

    protected get header() : JSX.Element
    {
        return (
            <React.Fragment>
                {parseFunction(this.exercise.referenceImplementation).signature}
            </React.Fragment>
        );
    }
}
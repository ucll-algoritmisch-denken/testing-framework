import React, { cloneElement } from 'react';
import { Maybe } from 'maybe';
import { IHasDifficulty } from '../difficulty';
import { IScored } from '../score';
import { IExercise } from '../exercises/exercise';
import { ExerciseSection } from './exercise-section';
import { ISolutionPack, retrieveSolutions } from '../solution-pack';
import { Lazy } from '../lazy';
import { verifySolutions } from '../exercises/verify-solutions';
import { parseFunction, FunctionInformation } from '../function-util';
import { DescriptionBox, HintViewer, MultiSolutionViewer } from '../components';


/**
 * Assumes one exercise (created by createExercise method). Shows description, test results,
 * hint and solutions.
 */
export abstract class CodingExerciseSection<Ps extends any[], R> extends ExerciseSection implements IHasDifficulty, IScored
{
    protected abstract createExercise(testedImplementation : Maybe<(...args : Ps) => R>) : IExercise;

    /**
     * Will be put into a DescriptionBox.
     */
    protected abstract readonly description : JSX.Element;
    
    protected abstract readonly solutionPack : ISolutionPack<Ps, R>;
    
    protected abstract readonly testedImplementation : Maybe<(...args : Ps) => R>;

    /**
     * If true, solutions will be checked for consistency.
     */
    protected abstract readonly verifySolutions : boolean;

    constructor()
    {
        super();

        this.cachedExercise = new Lazy( () => {
            verifySolutions(f => this.createExercise(Maybe.just(f)), this.solutionPack);
            return this.createExercise(this.testedImplementation);
        });

        this.cachedReferenceImplementationInformation = new Lazy(() => parseFunction(this.solutionPack));
    }

    private readonly cachedReferenceImplementationInformation : Lazy<FunctionInformation>;

    protected get referenceImplementationInformation() : FunctionInformation
    {
        return this.cachedReferenceImplementationInformation.value;
    }

    public get id()
    {
        return this.referenceImplementationInformation.functionName;
    }

    public get tocEntry()
    {
        return (
            <React.Fragment>
                {this.referenceImplementationInformation.functionName}
            </React.Fragment>
        );
    }

    /**
     * If not null, will be put in HintViewer.
     */
    protected get hint() : JSX.Element | null
    {
        return null;
    }

    protected get header()
    {
        return (
            <React.Fragment>
                {this.referenceImplementationInformation.signature}
            </React.Fragment>
        );
    }

    public isScored() : this is IScored { return true; }

    public hasDifficulty() : this is IHasDifficulty { return true; }

    public get score()
    {
        return this.exercise.score;
    }

    protected get exerciseContent()
    {
        return (
            <React.Fragment>
                <DescriptionBox>
                    {this.description}
                </DescriptionBox>
                {this.exercise.render()}
                {this.renderHint()}
                {this.solutions}
            </React.Fragment>
        );
    }

    protected renderHint()
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

    private cachedExercise : Lazy<IExercise>;

    protected get exercise()
    {
        return this.cachedExercise.value;
    }

    protected get solutions() : JSX.Element
    {
        return (
            <MultiSolutionViewer solutions={retrieveSolutions(this.solutionPack) as any} />
        )
    }
}
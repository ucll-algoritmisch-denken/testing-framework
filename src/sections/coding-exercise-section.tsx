import React from 'react';
import { Maybe } from 'maybe';
import { IExercise } from '../exercises/exercise';
import { ExerciseSection } from './exercise-section';
import { ISolutionPack, retrieveSolutions, isSolutionPack, Solution } from '../solution-pack';
import { Lazy } from '../lazy';
import { verifySolutions } from '../exercises/verify-solutions';
import { parseFunction, FunctionInformation } from '../function-util';
import { DescriptionBox, HintViewer, MultiSolutionViewer, SolutionViewer } from '../components';
import { SourceCode, Language } from 'source-code';


/**
 * Assumes one exercise (created by createExercise method). Shows description, test results,
 * hint and solutions.
 */
export abstract class CodingExerciseSection<Ps extends any[], R> extends ExerciseSection
{
    // testedImplementation parameter is needed for solution verification
    protected abstract createExercise(testedImplementation : Maybe<(...args : Ps) => R>) : IExercise;

    /**
     * Will be put into a DescriptionBox.
     */
    protected abstract readonly description : JSX.Element;

    protected abstract readonly solutionPack : (...args : Ps) => R; // TODO Rename to solution

    protected abstract readonly testedImplementation : Maybe<(...args : Ps) => R>;

    /**
     * If true, solutions will be checked for consistency.
     */
    protected abstract readonly verifySolutions : boolean;

    constructor()
    {
        super();

        this.cachedExercise = new Lazy( () => {
            if ( isSolutionPack(this.solutionPack) )
            {
                verifySolutions(f => this.createExercise(Maybe.just(f)), this.solutionPack);
            }

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

    public get caption()
    {
        return this.referenceImplementationInformation.functionName;
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
        if ( isSolutionPack(this.solutionPack) )
        {
            return (
                <MultiSolutionViewer solutions={retrieveSolutions(this.solutionPack) as any} />
            );
        }
        else
        {
            const me = this;

            const sourceCode = new SourceCode(Language.JavaScript, this.solutionPack.toString());

            return (
                <SolutionViewer sourceCode={sourceCode} />
            );
        }
    }
}
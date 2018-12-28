import React from 'react';
import { DescriptionBox } from '../components';
import { IExercise } from '../exercises/exercise';
import { FunctionInformation } from '../function-util';
import { Lazy } from '../lazy';
import { ExerciseSection } from './exercise-section';


/**
 * Assumes one exercise (created by createExercise method). Shows description, test results,
 * hint and solutions.
 */
export abstract class BasicCodingExerciseSection<Ps extends any[], R> extends ExerciseSection
{
    protected abstract createExercise() : IExercise;

    /**
     * Will be put into a DescriptionBox.
     */
    protected abstract readonly description : JSX.Element;

    protected abstract readonly prototypeFunctionInformation : FunctionInformation;

    constructor()
    {
        super();

        this.cachedExercise = new Lazy( () => {
            return this.createExercise();
        });
    }

    public get id()
    {
        return this.prototypeFunctionInformation.functionName;
    }

    public get caption()
    {
        return this.prototypeFunctionInformation.functionName;
    }

    protected get header()
    {
        return (
            <React.Fragment>
                {this.prototypeFunctionInformation.signature}
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
            </React.Fragment>
        );
    }

    private cachedExercise : Lazy<IExercise>;

    protected get exercise()
    {
        return this.cachedExercise.value;
    }
}
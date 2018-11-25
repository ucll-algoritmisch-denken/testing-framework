import React from 'react';
import { Maybe } from 'maybe';
import { IExercise } from 'exercises/exercise';
import { ExerciseSection } from './exercise-section';
import { Lazy } from 'lazy';
import { Score } from 'score';



type TestedImplementations<T> = {
    readonly [P in keyof T] : Maybe<T[P]>;
};

export abstract class MultiCodingExerciseSection<T> extends ExerciseSection
{
    protected abstract createExercises() : { [key in keyof T] : IExercise };

    protected abstract readonly testedImplementations : TestedImplementations<T>;

    constructor()
    {
        super();

        this.cachedExercises = new Lazy( () => this.createExercises() );
    }

    public get id()
    {
        return this.caption;
    }

    protected get header()
    {
        return (
            <React.Fragment>
                {this.caption}
            </React.Fragment>
        );
    }

    public get score()
    {
        return Score.summate(...this.exerciseIds.map(id => this.exercise(id).score));
    }

    private cachedExercises : Lazy<{ [key in keyof T] : IExercise }>;

    protected exercise(id : keyof T) : IExercise
    {
        return this.cachedExercises.value[id];
    }

    protected get exerciseIds() : (keyof T)[]
    {
        return Object.keys(this.cachedExercises.value) as any;
    }
}
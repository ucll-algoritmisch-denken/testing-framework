import React from 'react';
import { Maybe, MaybePartial, maybePartial } from 'maybe';
import { IExercise } from '../exercises/exercise';
import { ExerciseSection } from './exercise-section';
import { Lazy } from '../lazy';
import { Score } from '../score';
import { ExerciseGroup } from '../exercises/exercise-group';



export abstract class MvcCodingExerciseSection<M, V, C> extends ExerciseSection
{
    protected abstract createExercises() : { model: { [key in keyof M] : IExercise }, view: { [key in keyof V] : IExercise }, controller: { [key in keyof C] : IExercise } };

    private cachedModelExerciseGroup : Lazy<ExerciseGroup<M>>;

    private cachedViewExerciseGroup : Lazy<ExerciseGroup<V>>;

    private cachedControllerExerciseGroup : Lazy<ExerciseGroup<C>>;

    protected get modelExerciseGroup() { return this.cachedModelExerciseGroup.value; }

    protected get viewExerciseGroup() { return this.cachedViewExerciseGroup.value; }

    protected get controllerExerciseGroup() { return this.cachedControllerExerciseGroup.value; }

    public static repackTestedImplementations<M, V, C>(testedImplementations : Maybe<Partial<{ model: Partial<M>, view: Partial<V>, controller: Partial<C> }>>) : { model: MaybePartial<M>, view: MaybePartial<V>, controller: MaybePartial<C> }
    {
        return testedImplementations.caseOf({
            nothing: () => {
                return { model: maybePartial<M>({}), view: maybePartial<V>({}), controller: maybePartial<C>({}) };
            },
            just: testedImplementations => {
                const { model, view, controller } = testedImplementations;

                return {
                    model: model ? maybePartial<M>(model) : maybePartial<M>({}),
                    view: view ? maybePartial<V>(view) : maybePartial<V>({}),
                    controller: controller ? maybePartial<C>(controller) : maybePartial<C>({}),
                };
            }
        });
    }

    constructor()
    {
        super();

        const exercises = this.createExercises();

        this.cachedModelExerciseGroup = new Lazy(() => new class extends ExerciseGroup<M>
        {
            protected createExercises(): { [key in keyof M]: IExercise; }
            {
                return exercises.model;
            }
        });

        this.cachedViewExerciseGroup = new Lazy(() => new class extends ExerciseGroup<V>
        {
            protected createExercises(): { [key in keyof V]: IExercise; }
            {
                return exercises.view;
            }
        });

        this.cachedControllerExerciseGroup = new Lazy(() => new class extends ExerciseGroup<C>
        {
            protected createExercises(): { [key in keyof C]: IExercise; }
            {
                return exercises.controller;
            }
        });
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
        const me = this;

        const modelScore = this.cachedModelExerciseGroup.value.score;
        const viewScore = this.cachedViewExerciseGroup.value.score;
        const controllerScore = this.cachedControllerExerciseGroup.value.score;

        return Score.summate(modelScore, viewScore, controllerScore);
    }
}
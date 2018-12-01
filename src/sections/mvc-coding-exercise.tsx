import React from 'react';
import { Maybe, MaybePartial, maybePartial } from 'maybe';
import { IExercise } from 'exercises/exercise';
import { ExerciseSection } from './exercise-section';
import { Lazy } from 'lazy';
import { Score } from 'score';
import { ExerciseGroup } from '../exercises/exercise-group';



export abstract class MvcCodingExerciseSection<M, V, C> extends ExerciseSection
{
    protected abstract createExercises() : { model: { [key in keyof M] : IExercise }, view: { [key in keyof V] : IExercise }, controller: { [key in keyof C] : IExercise } };

    protected abstract readonly testedImplementations : Maybe<Partial<{ model: Partial<M>, view: Partial<V>, controller: Partial<C> }>>;

    private modelExerciseGroup : Lazy<ExerciseGroup<M>>;

    private viewExerciseGroup : Lazy<ExerciseGroup<V>>;

    private controllerExerciseGroup : Lazy<ExerciseGroup<C>>;

    constructor()
    {
        super();

        const exercises = this.createExercises();

        const testedImplementations = new Lazy(() => this.testedImplementations.caseOf({
            nothing: () => {
                return { model: maybePartial<M>({}), view: maybePartial<V>({}), controller: maybePartial<C>({}) }
            },
            just: testedImplementations => {
                const { model, view, controller } = testedImplementations;

                return {
                    model: model ? maybePartial<M>(model) : maybePartial<M>({}),
                    view: view ? maybePartial<V>(view) : maybePartial<V>({}),
                    controller: controller ? maybePartial<C>(controller) : maybePartial<C>({}),
                };
            }
        }));

        this.modelExerciseGroup = new Lazy(() => new class extends ExerciseGroup<M>
        {
            protected createExercises(): { [key in keyof M]: IExercise; }
            {
                return exercises.model;
            }

            protected testedImplementations: MaybePartial<M> = testedImplementations.value.model;
        });

        this.viewExerciseGroup = new Lazy(() => new class extends ExerciseGroup<V>
        {
            protected createExercises(): { [key in keyof V]: IExercise; }
            {
                return exercises.view;
            }

            protected testedImplementations: MaybePartial<V> = testedImplementations.value.view;
        });

        this.controllerExerciseGroup = new Lazy(() => new class extends ExerciseGroup<C>
        {
            protected createExercises(): { [key in keyof C]: IExercise; }
            {
                return exercises.controller;
            }

            protected testedImplementations: MaybePartial<C> = testedImplementations.value.controller;
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

        const modelScore = this.modelExerciseGroup.value.score;
        const viewScore = this.viewExerciseGroup.value.score;
        const controllerScore = this.controllerExerciseGroup.value.score;

        return Score.summate(modelScore, viewScore, controllerScore);
    }
}
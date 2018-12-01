/// <reference types="react" />
import { Maybe } from 'maybe';
import { IExercise } from 'exercises/exercise';
import { ExerciseSection } from './exercise-section';
import { Score } from 'score';
export declare abstract class MvcCodingExerciseSection<M, V, C> extends ExerciseSection {
    protected abstract createExercises(): {
        model: {
            [key in keyof M]: IExercise;
        };
        view: {
            [key in keyof V]: IExercise;
        };
        controller: {
            [key in keyof C]: IExercise;
        };
    };
    protected abstract readonly testedImplementations: Maybe<Partial<{
        model: Partial<M>;
        view: Partial<V>;
        controller: Partial<C>;
    }>>;
    private modelExerciseGroup;
    private viewExerciseGroup;
    private controllerExerciseGroup;
    constructor();
    readonly id: string;
    protected readonly header: JSX.Element;
    readonly score: Score;
}

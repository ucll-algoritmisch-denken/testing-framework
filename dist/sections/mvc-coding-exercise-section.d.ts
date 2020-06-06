/// <reference types="react" />
import { Maybe, MaybePartial } from 'maybe';
import { IExercise } from '../exercises/exercise';
import { ExerciseSection } from './exercise-section';
import { Score } from '../score';
import { ExerciseGroup } from '../exercises/exercise-group';
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
    private cachedModelExerciseGroup;
    private cachedViewExerciseGroup;
    private cachedControllerExerciseGroup;
    protected get modelExerciseGroup(): ExerciseGroup<M>;
    protected get viewExerciseGroup(): ExerciseGroup<V>;
    protected get controllerExerciseGroup(): ExerciseGroup<C>;
    static repackTestedImplementations<M, V, C>(referenceImplementations: {
        model: M;
        view: V;
        controller: C;
    }, testedImplementations: Maybe<Partial<{
        model: Partial<M>;
        view: Partial<V>;
        controller: Partial<C>;
    }>>): {
        model: MaybePartial<M>;
        view: MaybePartial<V>;
        controller: MaybePartial<C>;
    };
    constructor();
    get id(): string;
    protected get header(): JSX.Element;
    get score(): Score;
}

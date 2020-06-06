/// <reference types="react" />
import { MaybePartial } from 'maybe';
import { IExercise } from '../exercises/exercise';
import { ExerciseSection } from './exercise-section';
import { Score } from '../score';
export declare abstract class MultiCodingExerciseSection<T> extends ExerciseSection {
    protected abstract createExercises(): {
        [key in keyof T]: IExercise;
    };
    protected abstract readonly testedImplementations: MaybePartial<T>;
    constructor();
    get id(): string;
    protected get header(): JSX.Element;
    get score(): Score;
    private cachedExercises;
    protected exercise(id: keyof T): IExercise;
    protected get exerciseIds(): (keyof T)[];
}

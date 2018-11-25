/// <reference types="react" />
import { Maybe } from 'maybe';
import { IExercise } from 'exercises/exercise';
import { ExerciseSection } from './exercise-section';
import { Score } from 'score';
declare type TestedImplementations<T> = {
    readonly [P in keyof T]: Maybe<T[P]>;
};
export declare abstract class MultiCodingExerciseSection<T> extends ExerciseSection {
    protected abstract createExercises(): {
        [key in keyof T]: IExercise;
    };
    protected abstract readonly testedImplementations: TestedImplementations<T>;
    constructor();
    readonly id: string;
    protected readonly header: JSX.Element;
    readonly score: Score;
    private cachedExercises;
    protected exercise(id: keyof T): IExercise;
    protected readonly exerciseIds: (keyof T)[];
}
export {};

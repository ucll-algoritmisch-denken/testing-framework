/// <reference types="react" />
import { IHasDifficulty } from '../difficulty';
import { ReferenceImplementationBasedCodingExercise } from '../exercises/reference-implementation-based-coding-exercise';
import { IScored, Score } from '../score';
import { Solution } from '../solution-pack';
import { ExerciseSection } from './exercise-section';
declare type Exercise<Ps extends any[], R, META> = ReferenceImplementationBasedCodingExercise<Ps, R, META>;
export declare abstract class ReferenceBasedCodingExerciseSection<Ps extends any[], R, META = {}> extends ExerciseSection {
    abstract readonly difficulty: number;
    protected abstract createExercise(): Exercise<Ps, R, META>;
    protected abstract readonly description: JSX.Element;
    private readonly cachedExercise;
    constructor();
    /**
     * Do not override. Override createExercise() instead.
     */
    protected readonly exercise: Exercise<Ps, R, META>;
    readonly id: string;
    isScored(): this is IScored;
    hasDifficulty(): this is IHasDifficulty;
    readonly score: Score;
    readonly caption: string;
    protected readonly exerciseContent: JSX.Element;
    protected renderDescription(): JSX.Element;
    protected renderHint(): JSX.Element;
    protected renderSolution(): JSX.Element;
    protected readonly htmlClasses: string[];
    protected readonly hint: JSX.Element | null;
    protected readonly solutions: Solution<Ps, R>[];
    protected readonly header: JSX.Element;
}
export {};

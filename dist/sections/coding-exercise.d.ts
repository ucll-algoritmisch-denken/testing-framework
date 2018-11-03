/// <reference types="react" />
import { Maybe } from 'maybe';
import { IExercise } from '../exercises/exercise';
import { ExerciseSection } from './exercise-section';
import { ISolutionPack } from '../solution-pack';
import { FunctionInformation } from '../function-util';
/**
 * Assumes one exercise (created by createExercise method). Shows description, test results,
 * hint and solutions.
 */
export declare abstract class CodingExerciseSection<Ps extends any[], R> extends ExerciseSection {
    protected abstract createExercise(testedImplementation: Maybe<(...args: Ps) => R>): IExercise;
    /**
     * Will be put into a DescriptionBox.
     */
    protected abstract readonly description: JSX.Element;
    protected abstract readonly solutionPack: ISolutionPack<Ps, R>;
    protected abstract readonly testedImplementation: Maybe<(...args: Ps) => R>;
    /**
     * If true, solutions will be checked for consistency.
     */
    protected abstract readonly verifySolutions: boolean;
    constructor();
    private readonly cachedReferenceImplementationInformation;
    protected readonly referenceImplementationInformation: FunctionInformation;
    readonly id: string;
    readonly caption: string;
    /**
     * If not null, will be put in HintViewer.
     */
    protected readonly hint: JSX.Element | null;
    protected readonly header: JSX.Element;
    readonly score: import("score").Score;
    protected readonly exerciseContent: JSX.Element;
    protected renderHint(): JSX.Element;
    private cachedExercise;
    protected readonly exercise: IExercise;
    protected readonly solutions: JSX.Element;
}

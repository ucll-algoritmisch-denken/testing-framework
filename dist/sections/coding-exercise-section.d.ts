/// <reference types="react" />
import { Maybe } from 'maybe';
import { IExercise } from '../exercises/exercise';
import { ExerciseSection } from './exercise-section';
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
    protected abstract readonly solutionPack: (...args: Ps) => R;
    protected abstract readonly testedImplementation: Maybe<(...args: Ps) => R>;
    /**
     * If true, solutions will be checked for consistency.
     */
    protected abstract readonly verifySolutions: boolean;
    constructor();
    private readonly cachedReferenceImplementationInformation;
    protected get referenceImplementationInformation(): FunctionInformation;
    get id(): string;
    get caption(): string;
    /**
     * If not null, will be put in HintViewer.
     */
    protected get hint(): JSX.Element | null;
    protected get header(): JSX.Element;
    get score(): import("..").Score;
    protected get exerciseContent(): JSX.Element;
    protected renderHint(): JSX.Element;
    private cachedExercise;
    protected get exercise(): IExercise;
    protected get solutions(): JSX.Element;
}

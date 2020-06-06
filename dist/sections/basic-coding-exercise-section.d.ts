/// <reference types="react" />
import { IExercise } from '../exercises/exercise';
import { FunctionInformation } from '../function-util';
import { ExerciseSection } from './exercise-section';
/**
 * Assumes one exercise (created by createExercise method). Shows description, test results,
 * hint and solutions.
 */
export declare abstract class BasicCodingExerciseSection<Ps extends any[], R> extends ExerciseSection {
    protected abstract createExercise(): IExercise;
    /**
     * Will be put into a DescriptionBox.
     */
    protected abstract readonly description: JSX.Element;
    protected abstract readonly prototypeFunctionInformation: FunctionInformation;
    constructor();
    get id(): string;
    get caption(): string;
    protected get header(): JSX.Element;
    get score(): import("..").Score;
    protected get exerciseContent(): JSX.Element;
    private cachedExercise;
    protected get exercise(): IExercise;
}

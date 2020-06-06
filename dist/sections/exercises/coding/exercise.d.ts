/// <reference types="react" />
import { Exercise as BaseExercise } from "../exercise";
import { ITestCase } from './test-case';
import { IScored, Score } from '../../../score';
import { IHasDifficulty, difficulty } from '../../../difficulty';
import { Solution } from '../../../solution-pack';
export declare abstract class Exercise extends BaseExercise implements IHasDifficulty, IScored {
    protected abstract readonly description: JSX.Element;
    protected abstract generateTestCases(): Iterable<ITestCase>;
    protected get hint(): JSX.Element | null;
    protected abstract readonly solutions: Solution<any[], any>[];
    abstract readonly difficulty: difficulty;
    private _score;
    constructor();
    hasDifficulty(): this is IHasDifficulty;
    isScored(): this is IScored;
    protected get maximumScore(): number;
    /**
     * Do not override! Override computeScore() instead.
     */
    get score(): Score;
    protected computeScore(): Score;
    protected get exerciseContent(): JSX.Element;
    protected renderDescription(): JSX.Element;
    protected renderTestCases(): JSX.Element;
    protected renderTestCase(testCase: ITestCase): JSX.Element;
    protected renderHint(): JSX.Element;
    protected renderSolution(): JSX.Element;
    protected get htmlClasses(): string[];
}

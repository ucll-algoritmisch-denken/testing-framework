/// <reference types="react" />
import { Exercise as BaseExercise } from "../exercise";
import { ITestCase } from './test-case';
import { IScored, Score } from '../../../score';
import { IHasDifficulty, difficulty } from '../../../difficulty';
import { SourceCode } from '../../../source-code';
export declare abstract class Exercise extends BaseExercise implements IHasDifficulty, IScored {
    protected abstract readonly description: JSX.Element;
    protected abstract generateTestCases(): Iterable<ITestCase>;
    protected readonly hint: JSX.Element | null;
    protected abstract readonly solutions: {
        [key: string]: SourceCode;
    };
    abstract readonly difficulty: difficulty;
    private _score;
    constructor();
    hasDifficulty(): this is IHasDifficulty;
    isScored(): this is IScored;
    protected readonly maximumScore: number;
    /**
     * Do not override! Override computeScore() instead.
     */
    readonly score: Score;
    protected computeScore(): Score;
    protected readonly exerciseContent: JSX.Element;
    protected renderDescription(): JSX.Element;
    protected renderTestCases(): JSX.Element;
    protected renderTestCase(testCase: ITestCase): JSX.Element;
    protected renderHint(): JSX.Element;
    protected renderSolution(): JSX.Element;
    protected readonly htmlClasses: string[];
}

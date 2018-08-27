/// <reference types="react" />
import { IExercise } from './exercise';
import { Score } from '../score';
import { ITestCase } from './test-case';
import './test-case-based-coding-exercise.scss';
export declare abstract class TestCaseBasedCodingExercise implements IExercise {
    /**
     * Generates test cases.
     */
    protected abstract generateTestCases(): Iterable<ITestCase>;
    constructor();
    private cachedScore;
    protected readonly maximumScore: number;
    /**
     * Returns maximum score if all test cases succeed, 0 otherwise.
     *
     * Do not override. Override computeScore() instead.
     */
    readonly score: Score;
    protected computeScore(): Score;
    render(): JSX.Element;
    protected renderTestCase(testCase: ITestCase): JSX.Element;
}

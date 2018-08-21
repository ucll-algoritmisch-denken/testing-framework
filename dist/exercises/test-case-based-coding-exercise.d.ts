/// <reference types="react" />
import { IExercise } from './exercise';
import { Score } from 'score';
import { ITestCase } from './test-case';
export declare abstract class TestCaseBasedCodingExercise implements IExercise {
    /**
     * Generates test cases.
     */
    protected abstract generateTestCases(): Iterable<ITestCase>;
    protected abstract readonly maximumScore: number;
    constructor();
    private cachedScore;
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

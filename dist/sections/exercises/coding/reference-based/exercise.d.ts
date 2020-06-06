/// <reference types="react" />
import { Exercise as CodingExercise } from '../exercise';
import { ITestCase } from '../test-case';
import { ITestCaseInput } from './test-case-input';
import { FunctionInformation, FunctionCallResults } from '../../../../function-util';
import { Maybe } from 'maybe';
import { Solution } from '../../../../solution-pack';
export declare abstract class Exercise<META = {}> extends CodingExercise {
    private __referenceInformation?;
    protected abstract referenceImplementations: ((...args: any[]) => any)[];
    protected abstract testedImplementation: Maybe<(...args: any[]) => any>;
    protected abstract generateTestCaseInputs(): Iterable<ITestCaseInput<META>>;
    protected abstract createTestCaseFromInputs(expected: FunctionCallResults, actual: Maybe<FunctionCallResults>, metadata: META): ITestCase;
    protected get solutions(): Solution<any[], any>[];
    protected get htmlClasses(): string[];
    protected generateTestCases(): Iterable<ITestCase>;
    get id(): string;
    get header(): JSX.Element;
    get tocEntry(): JSX.Element;
    protected get referenceInformation(): FunctionInformation;
    protected checkThatSolutionsYieldSameResults(testCaseInput: ITestCaseInput<META>): void;
}

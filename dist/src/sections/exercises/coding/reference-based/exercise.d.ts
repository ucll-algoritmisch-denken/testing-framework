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
    protected readonly solutions: Solution<any[], any>[];
    protected readonly htmlClasses: string[];
    protected generateTestCases(): Iterable<ITestCase>;
    readonly id: string;
    readonly header: JSX.Element;
    readonly tocEntry: JSX.Element;
    protected readonly referenceInformation: FunctionInformation;
    protected checkThatSolutionsYieldSameResults(testCaseInput: ITestCaseInput<META>): void;
}

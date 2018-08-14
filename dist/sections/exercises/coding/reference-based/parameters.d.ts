/// <reference types="react" />
import { ITestCase } from '../test-case';
import { Exercise } from './exercise';
import { FunctionCallResults } from '../../../../function-util';
import { IAssertion } from '../../../../assertions';
import { Maybe } from 'maybe';
export interface IParameterChecker<META = {}> {
    (original: any, expected: any, meta: META): IAssertion<any>;
}
export interface IParameterCheckers<META = {}> {
    [key: string]: IParameterChecker<META>;
}
export declare abstract class Parameters<META = {}> extends Exercise<META> {
    /**
     * Checkers that define which assertion to create for each parameter.
     * If no checker is defined for a parameter, an unmodified assertion is created.
     */
    protected abstract readonly parameterCheckers: IParameterCheckers<META>;
    protected createAssertion(expected: FunctionCallResults, metadata: META): IAssertion<FunctionCallResults>;
    protected createReturnValueAssertion(): IAssertion<FunctionCallResults>;
    protected renderTestCaseHeader(expected: FunctionCallResults, _metadata: META): JSX.Element;
    protected createTestCaseFromInputs(expected: FunctionCallResults, actual: Maybe<FunctionCallResults>, metadata: META): ITestCase;
}

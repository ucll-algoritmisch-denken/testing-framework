import { ITestCase } from '../test-case';
import { Exercise } from './exercise';
import { FunctionCallResults } from '../../../../function-util';
import { IAssertion } from '../../../../assertions';
import { Maybe } from 'maybe';
export declare abstract class ReturnValue<META = {}> extends Exercise<META> {
    protected createAssertion(expected: FunctionCallResults, metadata: META): IAssertion<FunctionCallResults>;
    protected createReturnValueAssertion(expectedReturnValue: any, _metadata: META): IAssertion<any>;
    protected createParameterAssertion(_parameterIndex: number, _parameterName: string, originalValue: any): IAssertion<any>;
    protected renderTestCaseHeader(expected: FunctionCallResults, _metadata: META): JSX.Element;
    protected createTestCaseFromInputs(expected: FunctionCallResults, actual: Maybe<FunctionCallResults>, metadata: META): ITestCase;
}

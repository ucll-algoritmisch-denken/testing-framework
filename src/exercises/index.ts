export * from './exercise';
import { ITestCase as _ITestCase } from './test-case';
import { CollapsibleTestCase as _CollapsibleTestCase } from './collapsible-test-case';
import { TestCaseBasedCodingExercise } from './test-case-based-coding-exercise';
import { ReferenceImplementationBasedCodingExercise, ITestCaseInput as _ITestCaseInput } from './reference-implementation-based-coding-exercise';
import { ReturnValueCodingExercise } from './return-value-coding-exercise';
import { verifySolutions as _verifySolutions } from './verify-solutions';


export namespace Coding
{
    export const Exercise = TestCaseBasedCodingExercise;

    export const verifySolutions = _verifySolutions;

    export namespace TestCaseBased
    {
        export type ITestCase = _ITestCase;

        export const CollapsibleTestCase = _CollapsibleTestCase;

        export namespace ReferenceBased
        {
            export type ITestCaseInput<Ps extends any[], Meta = {}> = _ITestCaseInput<Ps, Meta>;

            export const Exercise = ReferenceImplementationBasedCodingExercise;

            export namespace ReturnValue
            {
                export const Exercise = ReturnValueCodingExercise;
            }
        }
    }
}

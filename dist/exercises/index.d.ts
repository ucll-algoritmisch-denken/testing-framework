export * from './exercise';
import { ITestCase as _ITestCase } from './test-case';
import { CollapsibleTestCase as _CollapsibleTestCase } from './collapsible-test-case';
import { TestCaseBasedCodingExercise } from './test-case-based-coding-exercise';
import { ReferenceImplementationBasedCodingExercise, ITestCaseInput as _ITestCaseInput } from './reference-implementation-based-coding-exercise';
import { ReturnValueCodingExercise } from './return-value-coding-exercise';
export declare namespace Coding {
    const Exercise: typeof TestCaseBasedCodingExercise;
    namespace TestCaseBased {
        type ITestCase = _ITestCase;
        const CollapsibleTestCase: typeof _CollapsibleTestCase;
        namespace ReferenceBased {
            type ITestCaseInput<Ps extends any[], R> = _ITestCaseInput<Ps, R>;
            const Exercise: typeof ReferenceImplementationBasedCodingExercise;
            namespace ReturnValue {
                const Exercise: typeof ReturnValueCodingExercise;
            }
        }
    }
}

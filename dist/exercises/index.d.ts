export * from './exercise';
import { ITestCase as _ITestCase } from './test-case';
import { CollapsibleTestCase as _CollapsibleTestCase } from './collapsible-test-case';
import { TestCaseBasedCodingExercise } from './test-case-based-coding-exercise';
import { ReferenceImplementationBasedCodingExercise, ITestCaseInput as _ITestCaseInput } from './reference-implementation-based-coding-exercise';
import { ReturnValueCodingExercise } from './return-value-coding-exercise';
import { ParameterCodingExercise, IParameterChecker as _IParameterChecker, IParameterCheckers as _IParameterCheckers } from './parameter-coding-exercise';
import { ReturnValueInterpretationExercise } from './return-value-interpretation-exercise';
export { verifySolutions } from './verify-solutions';
import { ExerciseGroup as _ExerciseGroup } from './exercise-group';
export declare namespace Coding {
    const Exercise: typeof TestCaseBasedCodingExercise;
    namespace TestCaseBased {
        type ITestCase = _ITestCase;
        const CollapsibleTestCase: typeof _CollapsibleTestCase;
        namespace ReferenceBased {
            type ITestCaseInput<Ps extends any[], Meta = {}> = _ITestCaseInput<Ps, Meta>;
            const Exercise: typeof ReferenceImplementationBasedCodingExercise;
            const ExerciseGroup: typeof _ExerciseGroup;
            namespace ReturnValue {
                const Exercise: typeof ReturnValueCodingExercise;
            }
            namespace Parameters {
                type IParameterChecker<T, META = {}> = _IParameterChecker<T, META>;
                type IParameterCheckers<META = {}> = _IParameterCheckers<META>;
                const Exercise: typeof ParameterCodingExercise;
            }
        }
    }
}
export declare namespace Interpretation {
    namespace ReturnValue {
        const Exercise: typeof ReturnValueInterpretationExercise;
    }
}

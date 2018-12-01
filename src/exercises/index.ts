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


export namespace Coding
{
    export const Exercise = TestCaseBasedCodingExercise;

    export namespace TestCaseBased
    {
        export type ITestCase = _ITestCase;

        export const CollapsibleTestCase = _CollapsibleTestCase;

        export namespace ReferenceBased
        {
            export type ITestCaseInput<Ps extends any[], Meta = {}> = _ITestCaseInput<Ps, Meta>;

            export const Exercise = ReferenceImplementationBasedCodingExercise;

            export const ExerciseGroup = _ExerciseGroup;

            export namespace ReturnValue
            {
                export const Exercise = ReturnValueCodingExercise;
            }

            export namespace Parameters
            {
                export type IParameterChecker<T, META={}> = _IParameterChecker<T, META>;

                export type IParameterCheckers<META={}> = _IParameterCheckers<META>;

                export const Exercise = ParameterCodingExercise;
            }
        }
    }
}

export namespace Interpretation
{
    export namespace ReturnValue
    {
        export const Exercise = ReturnValueInterpretationExercise;
    }
}
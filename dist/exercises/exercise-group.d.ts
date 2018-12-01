import { MaybePartial } from 'maybe';
import { IExercise } from 'exercises/exercise';
import { Score } from 'score';
export declare abstract class ExerciseGroup<T> {
    protected abstract createExercises(): {
        [key in keyof T]: IExercise;
    };
    protected abstract readonly testedImplementations: MaybePartial<T>;
    constructor();
    readonly score: Score;
    private cachedExercises;
    protected modelExercise(id: keyof T): IExercise;
}

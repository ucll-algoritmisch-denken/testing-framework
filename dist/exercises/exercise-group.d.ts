import { IExercise } from '../exercises/exercise';
import { Score } from '../score';
export declare abstract class ExerciseGroup<T> {
    protected abstract createExercises(): {
        [key in keyof T]: IExercise;
    };
    constructor();
    readonly score: Score;
    private cachedExercises;
    exercise(id: keyof T): IExercise;
}

import { Maybe, MaybePartial } from 'maybe';
import { IExercise } from '../exercises/exercise';
import { Lazy } from '../lazy';
import { Score } from '../score';


export abstract class ExerciseGroup<T>
{
    protected abstract createExercises() : { [key in keyof T] : IExercise };

    constructor()
    {
        this.cachedExercises = new Lazy( () => this.createExercises() );
    }

    public get score()
    {
        const exerciseIds : (keyof T)[] = Object.keys(this.cachedExercises.value) as any;

        return Score.summate(...exerciseIds.map(id => this.exercise(id).score));
    }

    private cachedExercises : Lazy<{ [key in keyof T] : IExercise }>;

    public exercise(id : keyof T) : IExercise
    {
        return this.cachedExercises.value[id];
    }
}

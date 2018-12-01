import { Maybe, MaybePartial } from 'maybe';
import { IExercise } from 'exercises/exercise';
import { Lazy } from 'lazy';
import { Score } from 'score';


export abstract class ExerciseGroup<T>
{
    protected abstract createExercises() : { [key in keyof T] : IExercise };

    protected abstract readonly testedImplementations : MaybePartial<T>;

    constructor()
    {
        this.cachedExercises = new Lazy( () => this.createExercises() );
    }

    public get score()
    {
        const me = this;
        const exerciseIds : (keyof T)[] = Object.keys(me.cachedExercises.value) as any;

        return Score.summate(...exerciseIds.map(id => this.modelExercise(id).score));
    }

    private cachedExercises : Lazy<{ [key in keyof T] : IExercise }>;

    protected modelExercise(id : keyof T) : IExercise
    {
        return this.cachedExercises.value[id];
    }
}

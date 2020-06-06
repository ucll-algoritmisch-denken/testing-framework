/// <reference types="react" />
import { Score } from "../score";
import { Maybe } from 'maybe';
export declare abstract class TrivialExercise<Ps extends any[], R> {
    protected abstract readonly testedImplementation: Maybe<(...args: Ps) => R>;
    get score(): Score;
    render(): JSX.Element;
}

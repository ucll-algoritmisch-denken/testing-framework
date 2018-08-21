import { Score } from "../score";


export interface IExercise
{
    readonly score : Score;

    render() : JSX.Element;
}

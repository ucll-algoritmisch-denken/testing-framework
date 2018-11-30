import { Outcome } from "../outcome";


export interface IResult
{
    outcome : Outcome;

    content : JSX.Element | null; // TODO Check if null is necessary or if returning an empty fragment suffices
}
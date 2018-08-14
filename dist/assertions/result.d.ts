/// <reference types="react" />
import { Outcome } from "outcome";
export interface IResult {
    outcome: Outcome;
    content: JSX.Element | null;
}

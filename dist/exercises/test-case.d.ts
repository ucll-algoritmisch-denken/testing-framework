/// <reference types="react" />
import { Outcome } from "../outcome";
export interface ITestCase {
    render(): JSX.Element;
    readonly outcome: Outcome;
}

import { Outcome } from "../outcome";


export interface ITestCase
{
    render() : JSX.Element;

    readonly outcome : Outcome;
}
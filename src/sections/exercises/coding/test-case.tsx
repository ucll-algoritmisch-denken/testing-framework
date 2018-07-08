import { Outcome } from '../../../outcome';


export interface ITestCase
{
    readonly header : JSX.Element;

    readonly content : JSX.Element;

    readonly outcome : Outcome;
}
import { IResult, IAssertion } from '.';
import { IToJsxElement } from '../formatters/jsx-formatters';
import './permutation.scss';
export declare class PermutationAssertion<T> implements IAssertion<T> {
    private expected;
    private formatter;
    constructor(expected: any, formatter: IToJsxElement<any>);
    check(actual: any): IResult;
    protected areEqual(x: T, y: T): boolean;
}
export declare function permutation<T>(expected: T, formatter?: IToJsxElement<any>): IAssertion<T>;

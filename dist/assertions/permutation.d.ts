import { IAssertion } from '.';
import { IToJsxElement } from '../formatters/jsx-formatters';
import './permutation.scss';
export declare function permutation<T>(expected: T, formatter?: IToJsxElement<any>): IAssertion<T>;

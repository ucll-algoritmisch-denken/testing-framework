import { IAssertion } from './assertion';
export declare function sequence<T>(assertions: IAssertion<T>[], stopAfterFailure?: boolean): IAssertion<T>;

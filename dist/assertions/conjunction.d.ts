import { IAssertion } from './assertion';
export declare function conjunction<T>(...assertions: IAssertion<T>[]): IAssertion<T>;

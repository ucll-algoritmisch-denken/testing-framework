import { IAssertion } from "./assertion";
export declare function lift<T, U>(f: (t: T) => U, assertion: IAssertion<U>): IAssertion<T>;

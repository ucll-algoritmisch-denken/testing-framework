import { Maybe } from 'maybe';
export interface IFunctionRepository {
    fetch(name: string): Maybe<((...args: any[]) => any)>;
    typedFetch<T>(name: string): Maybe<T>;
}
export declare function fromWindow(): IFunctionRepository;

import { Maybe, MaybePartial } from 'maybe';
export interface IFunctionRepository {
    fetch(name: string): Maybe<((...args: any[]) => any)>;
    typedFetch<T>(name: string): Maybe<T>;
    typedFetchObject<T>(name: string): MaybePartial<T>;
}
export declare function fromWindow(): IFunctionRepository;

import { Maybe } from 'maybe';
export interface IFunctionRepository {
    fetch(name: string): Maybe<((...args: any[]) => any)>;
}
export declare function fromWindow(): IFunctionRepository;

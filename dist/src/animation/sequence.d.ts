import { Animation, IAnimation } from './animation';
declare class Sequence<T> extends Animation<T> {
    private readonly children;
    constructor(children: IAnimation<T>[]);
    readonly duration: number;
    readonly endValue: T;
    at(t: number): T;
}
export declare function sequence<T>(...animations: IAnimation<T>[]): Sequence<T>;
export {};

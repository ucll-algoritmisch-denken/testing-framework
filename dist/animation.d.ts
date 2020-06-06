export interface IAnimation<T> {
    at(t: number): T;
    readonly duration: number;
    readonly endValue: T;
}
declare abstract class Animation<T> implements IAnimation<T> {
    abstract at(t: number): T;
    abstract readonly duration: number;
    get endValue(): T;
}
declare class Sequence<T> extends Animation<T> {
    private readonly children;
    constructor(children: IAnimation<T>[]);
    readonly duration: number;
    get endValue(): T;
    at(t: number): T;
}
export declare function constant<T>(value: T, duration: number): IAnimation<T>;
export declare function appendJump<T>(animation: IAnimation<T>, value: T): IAnimation<T>;
export declare function appendConstant<T>(animation: IAnimation<T>, duration: number): IAnimation<T>;
export declare function linear(from: number, to: number, duration: number): IAnimation<number>;
export declare function appendLinear(animation: IAnimation<number>, to: number, duration: number): IAnimation<number>;
export declare function delay<T>(animation: IAnimation<T>, dt: number): IAnimation<T>;
export declare function sequence<T>(...animations: IAnimation<T>[]): Sequence<T>;
export declare function map<T1, U>(f: (t1: T1) => U, animation: IAnimation<T1>): IAnimation<U>;
export declare function map<T1, T2, U>(f: (t1: T1, t2: T2) => U, a1: IAnimation<T1>, a2: IAnimation<T2>): IAnimation<U>;
export declare function map<T1, T2, T3, U>(f: (t1: T1, t2: T2, t3: T3) => U, a1: IAnimation<T1>, a2: IAnimation<T2>, a3: IAnimation<T3>): IAnimation<U>;
export declare function map<T1, T2, T3, T4, U>(f: (t1: T1, t2: T2, t3: T3, t4: T4) => U, a1: IAnimation<T1>, a2: IAnimation<T2>, a3: IAnimation<T3>, a4: IAnimation<T4>): IAnimation<U>;
export declare class NumberAnimationBuilder {
    private animation;
    constructor(initial: number);
    relativeTo(delta: number, duration: number): void;
    absoluteTo(to: number, duration: number): void;
    constant(duration: number): void;
    jump(to: number): void;
    build(): IAnimation<number>;
}
export {};

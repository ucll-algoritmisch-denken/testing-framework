export interface IAnimation<T> {
    at(t: number): T;
    readonly duration: number;
    readonly endValue: T;
}
export declare abstract class Animation<T> implements IAnimation<T> {
    abstract at(t: number): T;
    abstract readonly duration: number;
    get endValue(): T;
}

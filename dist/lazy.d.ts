export declare class Lazy<T> {
    private fetch;
    private forced;
    private __value;
    constructor(fetch: () => T);
    get value(): T;
    private force;
}

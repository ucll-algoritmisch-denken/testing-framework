import { IAnimation } from './animation';
export declare function map<T1, U>(f: (t1: T1) => U, animation: IAnimation<T1>): IAnimation<U>;
export declare function map<T1, T2, U>(f: (t1: T1, t2: T2) => U, a1: IAnimation<T1>, a2: IAnimation<T2>): IAnimation<U>;
export declare function map<T1, T2, T3, U>(f: (t1: T1, t2: T2, t3: T3) => U, a1: IAnimation<T1>, a2: IAnimation<T2>, a3: IAnimation<T3>): IAnimation<U>;
export declare function map<T1, T2, T3, T4, U>(f: (t1: T1, t2: T2, t3: T3, t4: T4) => U, a1: IAnimation<T1>, a2: IAnimation<T2>, a3: IAnimation<T3>, a4: IAnimation<T4>): IAnimation<U>;

export interface IType<T> {
    hasType(x: any): x is T;
    readonly isMutable: boolean;
}
export declare const string: {
    hasType(x: any): x is string;
    readonly isMutable: boolean;
};
export declare const number: {
    hasType(x: any): x is number;
    readonly isMutable: boolean;
};
export declare const boolean: {
    hasType(x: any): x is boolean;
    readonly isMutable: boolean;
};
export declare const undef: {
    hasType(x: any): x is undefined;
    readonly isMutable: boolean;
};
export declare const any: {
    hasType(x: any): x is any;
    readonly isMutable: boolean;
};
export declare const empty: {
    hasType(x: any): x is void;
    readonly isMutable: boolean;
};
export declare function array<T>(elementType: IType<T>): IType<T[]>;
export declare const func: {
    hasType(x: any): x is (...args: any[]) => any;
    readonly isMutable: boolean;
};
export declare const object: {
    hasType(x: any): x is {
        [key: string]: any;
    };
    readonly isMutable: boolean;
};

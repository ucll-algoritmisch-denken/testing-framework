export declare function createArray<T>(length: number, initializer: (i: number) => T): T[];
export declare function repeat<T>(length: number, x: T): T[];
export declare function isPermutation<T>(xs: T[], ys: T[], equality?: (x: T, y: T) => boolean): boolean;
export declare function allEqual<T>(xs: T[], equality?: (x: T, y: T) => boolean): boolean;

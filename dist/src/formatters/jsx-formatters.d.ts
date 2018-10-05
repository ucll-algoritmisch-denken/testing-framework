import { Color } from '../imaging';
export declare function jsxify(x: JSX.Element | string): JSX.Element;
export declare type IToJsxElement<T> = (t: T) => JSX.Element;
export declare function simple(x: any): JSX.Element;
export declare function code(str: string): JSX.Element;
export declare function grayscaleBitmap(xss: number[][], resize?: {
    width: number;
    height: number;
}): JSX.Element;
export declare function rgbBitmap(xss: Color[][], resize?: {
    width: number;
    height: number;
}): JSX.Element;
export declare function blackAndWhiteBitmap(xss: boolean[][], resize?: {
    width: number;
    height: number;
}): JSX.Element;
export declare function dice(ns: number[]): JSX.Element;
export declare function asHorizontalTable<T>(elements: T[], subformatter: (x: T) => JSX.Element, className: string): JSX.Element;
export declare function asVerticalTable<T>(elements: T[], subformatter: (x: T) => JSX.Element, className: string): JSX.Element;
export declare function asTable<T>(rows: T[][], subformatter: (x: T) => JSX.Element, className: string): JSX.Element;

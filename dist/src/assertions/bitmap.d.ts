import { EqualityAssertion } from './equality';
import { Maybe } from 'maybe';
import { Color } from '../imaging';
export declare class BlackAndWhiteBitmap extends EqualityAssertion<boolean[][]> {
    constructor(expected: boolean[][]);
    protected renderValue(pixels: boolean[][]): JSX.Element;
    protected readonly original: Maybe<boolean[][]>;
    expected: Maybe<boolean[][]>;
}
export declare class GrayscaleBitmap extends EqualityAssertion<number[][]> {
    constructor(expected: number[][]);
    protected renderValue(pixels: number[][]): JSX.Element;
    protected readonly original: Maybe<number[][]>;
    expected: Maybe<number[][]>;
}
export declare class ColorBitmap extends EqualityAssertion<Color[][]> {
    constructor(expected: Color[][]);
    protected renderValue(pixels: Color[][]): JSX.Element;
    protected readonly original: Maybe<Color[][]>;
    expected: Maybe<Color[][]>;
}

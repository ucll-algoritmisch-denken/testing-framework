import { IAssertion, createEqualityAssertion } from '../assertions';
import * as Formatters from '../formatters/jsx-formatters';


export function createGrayscaleBitmapAssertion(expected : number[][], original ?: number[][]) : IAssertion
{
    const options = {
        original,
        formatter: Formatters.grayscaleBitmap
    };

    return createEqualityAssertion(expected, options);
}

export function createRgbBitmapAssertion(expected : number[][][], original ?: number[][][]) : IAssertion
{
    const options = {
        original,
        formatter: Formatters.rgbBitmap
    };

    return createEqualityAssertion(expected, options);
}
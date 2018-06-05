import { IAssertion, createEqualityAssertion } from "testing-library/assertions";
import * as Formatters from 'testing-library/formatters/jsx-formatters';


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
        formatter: Formatters.RgbBitmap
    };

    return createEqualityAssertion(expected, options);
}
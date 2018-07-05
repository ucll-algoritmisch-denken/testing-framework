import * as Formatters from '../formatters/jsx-formatters';
import { IAssertion } from './assertion';
import { equality } from './equality';


// export function createGrayscaleBitmapAssertion(expected : number[][], original ?: number[][]) : IAssertion
// {
//     const options = {
//         original,
//         formatter: Formatters.grayscaleBitmap
//     };

//     return equality(expected, options);
// }

// export function createRgbBitmapAssertion(expected : number[][][], original ?: number[][][]) : IAssertion
// {
//     const options = {
//         original,
//         formatter: Formatters.rgbBitmap
//     };

//     return equality(expected, options);
// }
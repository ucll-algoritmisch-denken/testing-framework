import { Outcome } from './outcome';
import { Maybe } from './maybe';

export { createEqualityAssertion } from './assertions/equality';
export { createNoReturnAssertion } from './assertions/no-return';
export { createPermutationAssertion } from './assertions/permutation';
export { createUnmodifiedAssertion } from './assertions/unmodified';
export { createGrayscaleBitmapAssertion, createRgbBitmapAssertion } from './assertions/bitmap';


export interface IResult
{
    result : Outcome;

    content : JSX.Element;
}

export interface IAssertion
{
    check(x : Maybe<any>) : IResult;
}


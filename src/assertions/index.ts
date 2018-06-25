import { Outcome } from 'outcome';
import { Maybe } from 'tsmonad';

export { createEqualityAssertion } from './equality';
export { createNoReturnAssertion } from './no-return';
export { createPermutationAssertion } from './permutation';
export { createUnmodifiedAssertion } from './unmodified';
export { createGrayscaleBitmapAssertion, createRgbBitmapAssertion } from './bitmap';


export interface IResult
{
    result : Outcome;

    content : JSX.Element;
}

export interface IAssertion
{
    check(x : Maybe<any>) : IResult;
}

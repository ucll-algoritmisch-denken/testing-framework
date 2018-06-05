import { Outcome } from 'testing-library/outcome';
import { IMaybe } from 'testing-library/maybe';

export { createEqualityAssertion } from 'testing-library/assertions/equality';
export { createNoReturnAssertion } from 'testing-library/assertions/no-return';
export { createPermutationAssertion } from 'testing-library/assertions/permutation';
export { createUnmodifiedAssertion } from 'testing-library/assertions/unmodified';
export { createGrayscaleBitmapAssertion, createRgbBitmapAssertion } from 'testing-library/assertions/bitmap';


export interface IResult
{
    result : Outcome;

    content : JSX.Element;
}

export interface IAssertion
{
    check(x : IMaybe<any>) : IResult;
}


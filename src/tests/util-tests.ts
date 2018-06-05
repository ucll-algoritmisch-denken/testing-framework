import { expect } from 'chai';
import { isPermutation } from 'testing-library/util';
import { convertToString } from 'testing-library/formatters/string-formatters';


describe('isPermutation', () => {
    assertIsPermutation([], []);
    assertIsPermutation([1], [1]);
    assertIsPermutation([1, 2], [1, 2]);
    assertIsPermutation([1, 2], [2, 1]);
    assertIsPermutation([1, 2, 3], [1, 2, 3]);
    assertIsPermutation([1, 2, 3], [3, 2, 1]);
    assertIsPermutation([1, 2, 3], [2, 1, 3]);

    assertIsNoPermutation([], [1]);
    assertIsNoPermutation([1], [1, 1]);
    assertIsNoPermutation([1], [2]);


    function assertIsPermutation<T>(xs : T[], ys : T[])
    {
        it(`should say ${convertToString(xs)} is a permutation of ${convertToString(ys)}`, () => {
            expect(isPermutation(xs, ys)).to.be.true;
        });
    }

    function assertIsNoPermutation<T>(xs : T[], ys : T[])
    {
        it(`should say ${convertToString(xs)} is not a permutation of ${convertToString(ys)}`, () => {
            expect(isPermutation(xs, ys)).to.be.false;
        });
    }
});
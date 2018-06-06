import { expect } from 'chai';
import { isArray } from '../type';
import { convertToString } from '../formatters/string-formatters';


describe('isArray', () => {

    checkIsArray([]);
    checkIsArray(new Array(10));
    checkIsArray([1]);
    checkIsArray([[1]]);

    checkIsNotArray(5);
    checkIsNotArray(true);
    checkIsNotArray(undefined);

    function checkIsArray(x : any)
    {
        it(`should say ${convertToString(x)} is an array`, () => {
            expect(isArray(x)).to.be.true;
        });
    }

    function checkIsNotArray(x : any)
    {
        it(`should say ${convertToString(x)} is not an array`, () => {
            expect(isArray(x)).to.be.false;
        });
    }
});
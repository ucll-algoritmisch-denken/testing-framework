import { sqr } from '../src/main';
import { expect } from 'chai';

describe('sqr', () => {
    describe('of 1', () => {
        it('should return 1', () => {
            expect(sqr(1)).to.equal(1);
        });
    });

    describe('of 2', () => {
        it('should return 4', () => {
            expect(sqr(2)).to.equal(4);
        });
    });
});
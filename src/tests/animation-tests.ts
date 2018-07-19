import { expect } from 'chai';
import { NumberAnimationBuilder } from 'animation';


describe('NumberAnimationBuilder', () => {
    describe('[0] [constant 1s]', () => {
        const builder = new NumberAnimationBuilder(0);
        builder.constant(1);
        const animation = builder.build();

        it('should have duration 1', () => {
            expect(animation.duration).to.be.approximately(1, 0.0001);
        });

        describe('should be at 0', () => {
            it('at 0', () => {
                expect(animation.at(0)).to.be.approximately(0, 0.0001);
            });

            it('at 0.5', () => {
                expect(animation.at(0.5)).to.be.approximately(0, 0.0001);
            });

            it('at 1', () => {
                expect(animation.at(1)).to.be.approximately(0, 0.0001);
            });
        });
    });

    describe('[0] [jump 1]', () => {
        const builder = new NumberAnimationBuilder(0);
        builder.jump(1);
        const animation = builder.build();

        it('should have duration 0', () => {
            expect(animation.duration).to.be.approximately(0, 0.0001);
        });

        it('should have end value 1', () => {
            expect(animation.endValue).to.be.approximately(1, 0.0001);
        });
    });

    describe('[0] [jump 1] [constant 1s]', () => {
        const builder = new NumberAnimationBuilder(0);
        builder.jump(1);
        builder.constant(1);
        const animation = builder.build();

        it('should have duration 1', () => {
            expect(animation.duration).to.be.approximately(1, 0.0001);
        });

        describe('should be at 1', () => {
            it('at 0.5', () => {
                expect(animation.at(0.5)).to.be.approximately(1, 0.0001);
            });

            it('at 1', () => {
                expect(animation.at(1)).to.be.approximately(1, 0.0001);
            });
        });
    });
});
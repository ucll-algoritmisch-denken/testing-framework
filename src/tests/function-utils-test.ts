import { parseFunction, callFunction, namedCallFunction } from 'testing-library/function-util';
import { expect } from 'chai';


describe('parseFunction', () => {
    describe('applied on function foo()', () => {
        function foo() { }
        const result = parseFunction(foo);

        it('should return functionName foo', () => {
            expect(result.functionName).to.be.equal('foo');
        });

        it('should return zero parameter names', () => {
            expect(result.parameterNames.length).to.be.equal(0);
        });
    });

    describe('applied on function bar(x)', () => {
        function bar(x : any) { return x; }
        const result = parseFunction(bar);

        it('should return functionName bar', () => {
            expect(result.functionName).to.be.equal('bar');
        });

        it('should return one parameter name', () => {
            expect(result.parameterNames.length).to.be.equal(1);
        });

        it('should return x as first parameter name', () => {
            expect(result.parameterNames[0]).to.be.equal('x');
        });
    });

    describe('applied on function qux(a, b, c)', () => {
        function qux(a : any, b : any, c : any) { return [a, b, c]; }
        const result = parseFunction(qux);

        it('should return functionName qux', () => {
            expect(result.functionName).to.be.equal('qux');
        });

        it('should return one parameter name', () => {
            expect(result.parameterNames.length).to.be.equal(3);
        });

        it('should return x as first parameter name', () => {
            expect(result.parameterNames[0]).to.be.equal('a');
        });

        it('should return x as second parameter name', () => {
            expect(result.parameterNames[1]).to.be.equal('b');
        });

        it('should return x as third parameter name', () => {
            expect(result.parameterNames[2]).to.be.equal('c');
        });
    });
});

describe('callFunction', () => {
    describe('applied on sqr', () => {
        function sqr(x : number) { return x * x; }

        describe('with argument 0', () => {
            const result = callFunction(sqr, 0);

            it('should have a single argument before call', () =>
            {
                expect(result.argumentsBeforeCall.length).to.be.equal(1);
            });

            it('should have a single argument before call equal to 0', () =>
            {
                expect(result.argumentsBeforeCall[0]).to.be.equal(0);
            });

            it('should have a single argument after call', () =>
            {
                expect(result.argumentsAfterCall.length).to.be.equal(1);
            });

            it('should have a single argument after call equal to 0', () =>
            {
                expect(result.argumentsAfterCall[0]).to.be.equal(0);
            });

            it('should have a return value equal to 0', () =>
            {
                expect(result.returnValue).to.be.equal(0);
            });
        });
    });

    describe('applied on inc', () => {
        function inc(xs : number[])
        {
            for ( let i = 0; i !== xs.length; ++i )
            {
                xs[i]++;
            }
        }

        describe('with argument [1, 2, 3]', () => {
            const result = callFunction(inc, [1, 2, 3]);

            it('should have a single argument before call', () =>
            {
                expect(result.argumentsBeforeCall.length).to.be.equal(1);
            });

            it('should have a single argument before call equal to [1, 2, 3]', () =>
            {
                expect(result.argumentsBeforeCall[0]).to.be.eql([1, 2, 3]);
            });

            it('should have a single argument after call', () =>
            {
                expect(result.argumentsAfterCall.length).to.be.equal(1);
            });

            it('should have a single argument after call equal to [2, 3, 4]', () =>
            {
                expect(result.argumentsAfterCall[0]).to.be.eql([2, 3, 4]);
            });

            it('should have an undefined return value', () =>
            {
                expect(result.returnValue).to.be.undefined;
            });
        });
    });
});

describe('namedCallFunction', () => {
    describe('applied on sqr(x)', () => {
        function sqr(x : number) { return x * x; }

        describe('with argument 0', () => {
            const result = namedCallFunction(sqr, 0);

            it('should have a x == 0 before call', () =>
            {
                expect(result.argumentsBeforeCall.x).to.be.equal(0);
            });

            it('should have x == 0 after call', () =>
            {
                expect(result.argumentsAfterCall.x).to.be.equal(0);
            });

            it('should have a return value equal to 0', () =>
            {
                expect(result.returnValue).to.be.equal(0);
            });
        });
    });

    describe('applied on inc(xs)', () => {
        function inc(xs : number[])
        {
            for ( let i = 0; i !== xs.length; ++i )
            {
                xs[i]++;
            }
        }

        describe('with argument xs == [1, 2, 3]', () => {
            const result = namedCallFunction(inc, [1, 2, 3]);

            it('should have xs before call equal to [1, 2, 3]', () =>
            {
                expect(result.argumentsBeforeCall.xs).to.be.eql([1, 2, 3]);
            });

            it('should have xs after call equal to [2, 3, 4]', () =>
            {
                expect(result.argumentsAfterCall.xs).to.be.eql([2, 3, 4]);
            });

            it('should have an undefined return value', () =>
            {
                expect(result.returnValue).to.be.undefined;
            });
        });
    });
});
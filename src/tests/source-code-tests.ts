import { expect } from 'chai';
import { SourceCode, Language } from 'source-code';


describe('SourceCode', () => {
    describe('beautify', () => {
        it('should leave a nonindented line alone', () => {
            const s = new SourceCode(Language.Pseudocode, "x").beautify();

            expect(s.sourceCode).to.be.equal("x");
        });

        it('should left trim a single line', () => {
            const s = new SourceCode(Language.Pseudocode, "   x").beautify();

            expect(s.sourceCode).to.be.equal("x");
        });

        it('should remove empty lines at the beginning', () => {
            const source = `


            x`;
            const expected = `x`;
            const actual = new SourceCode(Language.Pseudocode, source).beautify().sourceCode;

            expect(actual).to.be.equal(expected);
        });

        it('should remove empty lines at the end', () => {
            const source = `x
            
            
            `;
            const expected = `x`;
            const actual = new SourceCode(Language.Pseudocode, source).beautify().sourceCode;

            expect(actual).to.be.equal(expected);
        });

        it('should unindent two lines with the same indentation level', () => {
            const source = `
                x
                y
            `;
            const expected = `x\ny`;
            const actual = new SourceCode(Language.Pseudocode, source).beautify().sourceCode;

            expect(actual).to.be.equal(expected);
        });

        it('should unindent using the minimal indentation', () => {
            const source = `
                x
                  y
            `;
            const expected = `x\n  y`;
            const actual = new SourceCode(Language.Pseudocode, source).beautify().sourceCode;

            expect(actual).to.be.equal(expected);
        });

        it('should ignore empty lines when determining indentation', () => {
            const source = `
                x
                  y

                x
                  y
            `;
            const expected = `x\n  y\n\nx\n  y`;
            const actual = new SourceCode(Language.Pseudocode, source).beautify().sourceCode;

            expect(actual).to.be.equal(expected);
        });
    });
});
import { js_beautify } from 'js-beautify';
import { firstIndexOf, lastIndexOf } from 'js-algorithms';

export enum Language
{
    JavaScript,
    Java,
    Python,
    CSharp,
    CPP,
    CommonLisp,
    Factor,
    Pseudocode,
}

export class SourceCode
{
    constructor(public language : Language, public sourceCode : string) { }

    public beautify() : SourceCode
    {
        if ( this.language === Language.JavaScript )
        {
            return new SourceCode(Language.JavaScript, js_beautify(this.sourceCode, { brace_style: 'collapse', keep_array_indentation: true }));
        }
        else
        {
            const lines = this.sourceCode.split("\n").map(line => line.trimRight());
            const indentationLevel = Math.min(...lines.map(indentation));
            const unindentedLines = lines.map(line => line.substr(indentationLevel));
            const firstNonemptyIndex = firstIndexOf(lines, line => line.length > 0).useDefault(0).value;
            const lastNonemptyIndex = lastIndexOf(lines, line => line.length > 0).useDefault(lines.length - 1).value;

            return new SourceCode(this.language, unindentedLines.slice(firstNonemptyIndex, lastNonemptyIndex + 1).join("\n"));
        }


        function indentation(line : string) : number
        {
            for ( let i = 0; i !== line.length; ++i )
            {
                if ( line[i] !== ' ' )
                {
                    return i;
                }
            }

            return Infinity;
        }
    }

    public join(other : SourceCode, separator : string = "\n\n") : SourceCode
    {
        if ( this.language !== other.language )
        {
            throw new Error(`Cannot append source code written in different languages`);
        }
        else
        {
            return new SourceCode(this.language, this.sourceCode + separator + other.sourceCode);
        }
    }
}
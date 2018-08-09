import { js_beautify } from 'js-beautify';


export enum Language
{
    JavaScript,
    Java,
    Python,
    CSharp,
    CPP,
    CommonLisp,
    Factor
}

export class SourceCode
{
    constructor(public language : Language, public sourceCode : string) { }

    public beautify() : SourceCode
    {
        if ( this.language === Language.JavaScript )
        {
            return new SourceCode(Language.JavaScript, js_beautify(this.sourceCode, { brace_style: 'expand' }));
        }
        else
        {
            // TODO
            return this;
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
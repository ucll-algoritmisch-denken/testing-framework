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

    public beautify()
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
}
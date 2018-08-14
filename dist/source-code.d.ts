export declare enum Language {
    JavaScript = 0,
    Java = 1,
    Python = 2,
    CSharp = 3,
    CPP = 4,
    CommonLisp = 5,
    Factor = 6
}
export declare class SourceCode {
    language: Language;
    sourceCode: string;
    constructor(language: Language, sourceCode: string);
    beautify(): SourceCode;
    join(other: SourceCode, separator?: string): SourceCode;
}

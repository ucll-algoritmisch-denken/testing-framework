export declare enum Outcome {
    Pass = 0,
    Fail = 1,
    Skip = 2
}
export declare function combineAssertionOutcomes(rs: Outcome[]): Outcome;
export declare function outcomeToHtmlClass(result: Outcome): "pass" | "fail" | "skip";

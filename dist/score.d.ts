export declare class Score {
    readonly grade: number;
    readonly maximum: number;
    constructor(grade: number, maximum: number);
    add(other: Score): Score;
    scale(newMaximum: number): Score;
    readonly isPerfect: boolean;
    static summate(...scores: Score[]): Score;
}
export interface IScored {
    readonly score: Score;
}

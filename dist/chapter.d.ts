/// <reference types="react" />
import { IScored } from 'score';
import { IHasDifficulty } from 'difficulty';
export interface IChapter {
    readonly title: string;
    readonly sections: ISection[];
}
export declare abstract class ISection {
    readonly abstract id: string;
    readonly abstract tocEntry: JSX.Element;
    readonly content: JSX.Element;
    abstract isScored(): this is IScored;
    abstract hasDifficulty(): this is IHasDifficulty;
}
export declare function selectScoredSections(sections: ISection[]): (ISection & IScored)[];

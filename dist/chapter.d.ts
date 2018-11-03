/// <reference types="react" />
import { IScored } from './score';
import { IHasDifficulty } from './difficulty';
export interface IChapter {
    readonly title: string;
    readonly sections: ISection[];
}
export interface ISection {
    readonly id: string;
    readonly tocEntry: JSX.Element;
    content: JSX.Element;
    isScored(): this is IScored;
    hasDifficulty(): this is IHasDifficulty;
}
export declare function selectScoredSections(sections: ISection[]): (ISection & IScored)[];

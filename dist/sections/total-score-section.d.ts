/// <reference types="react" />
import { ISection } from '../chapter';
export declare class TotalScoreSection implements ISection {
    private sections;
    constructor(sections: ISection[]);
    id: string;
    readonly tocEntry: JSX.Element;
    isScored(): boolean;
    hasDifficulty(): boolean;
    readonly content: JSX.Element;
}

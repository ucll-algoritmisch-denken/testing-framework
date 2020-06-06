/// <reference types="react" />
import { ISection } from '../chapter';
export declare class TotalScoreSection implements ISection {
    private sections;
    constructor(sections: ISection[]);
    id: string;
    get tocEntry(): JSX.Element;
    isScored(): boolean;
    hasDifficulty(): boolean;
    get content(): JSX.Element;
}

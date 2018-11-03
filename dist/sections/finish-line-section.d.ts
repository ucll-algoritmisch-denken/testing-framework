/// <reference types="react" />
import { ISection } from '../chapter';
export declare class FinishLineSection implements ISection {
    id: string;
    readonly tocEntry: JSX.Element;
    isScored(): boolean;
    hasDifficulty(): boolean;
    protected header: JSX.Element;
    readonly content: JSX.Element;
}

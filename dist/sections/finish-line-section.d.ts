/// <reference types="react" />
import { ISection } from '../chapter';
export declare class FinishLineSection implements ISection {
    id: string;
    get tocEntry(): JSX.Element;
    isScored(): boolean;
    hasDifficulty(): boolean;
    protected header: JSX.Element;
    get content(): JSX.Element;
}

/// <reference types="react" />
import { Explanations } from './explanations';
export declare class FinishLineSection extends Explanations {
    id: string;
    readonly tocEntry: JSX.Element;
    isScored(): boolean;
    hasDifficulty(): boolean;
    protected header: JSX.Element;
    protected readonly explanations: JSX.Element;
}

/// <reference types="react" />
import { ISection } from '../chapter';
import './explanations.scss';
import { IScored } from '../score';
export declare abstract class Explanations implements ISection {
    abstract readonly id: string;
    protected abstract readonly caption: string;
    protected abstract readonly header: JSX.Element;
    protected abstract readonly explanations: JSX.Element;
    readonly tocEntry: JSX.Element;
    isScored(): this is IScored;
    hasDifficulty(): boolean;
    readonly content: JSX.Element;
}

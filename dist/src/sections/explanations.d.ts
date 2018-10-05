import { ISection } from '../chapter';
import './explanations.scss';
import { IScored } from '../score';
export declare abstract class Explanations implements ISection {
    abstract readonly id: string;
    abstract readonly tocEntry: JSX.Element;
    protected abstract readonly header: JSX.Element;
    protected abstract readonly explanations: JSX.Element;
    isScored(): this is IScored;
    readonly content: JSX.Element;
    hasDifficulty(): boolean;
}

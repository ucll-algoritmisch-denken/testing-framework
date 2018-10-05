import { ISection } from '../../chapter';
import { IHasDifficulty } from '../../difficulty';
import { IScored } from '../../score';
import './exercise.scss';
export declare abstract class Exercise implements ISection {
    abstract readonly id: string;
    abstract readonly tocEntry: JSX.Element;
    protected abstract readonly header: JSX.Element;
    protected abstract readonly exerciseContent: JSX.Element;
    abstract hasDifficulty(): this is IHasDifficulty;
    abstract isScored(): this is IScored;
    readonly content: JSX.Element;
    protected renderDifficultyViewer(): JSX.Element;
    protected readonly htmlClasses: string[];
}

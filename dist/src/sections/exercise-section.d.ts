import { ISection } from '../chapter';
import { IHasDifficulty } from '../difficulty';
import { IScored } from '../score';
export declare abstract class ExerciseSection extends ISection {
    abstract readonly id: string;
    abstract readonly difficulty: number;
    abstract isScored(): this is IScored;
    abstract hasDifficulty(): this is IHasDifficulty;
    abstract readonly tocEntry: JSX.Element;
    protected abstract readonly header: JSX.Element;
    protected abstract readonly exerciseContent: JSX.Element;
    readonly content: JSX.Element;
    protected readonly htmlClasses: string[];
    protected renderDifficultyViewer(): JSX.Element;
}

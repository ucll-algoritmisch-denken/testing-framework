import { ISection } from './chapter';
import { Score, IScored } from './score';


export interface IChapter
{
    readonly title : string;

    readonly sections : ISection[];
}

export interface ISection
{
    readonly tocEntry: JSX.Element;

    readonly content : JSX.Element;

    isScored() : this is IScored;

    hasDifficulty() : this is IDifficultySection;

    readonly id : string;
}

export interface IDifficultySection extends ISection
{
    readonly difficulty : number;
}

export function selectScoredSections(sections : ISection[]) : (ISection & IScored)[]
{
    const result : (ISection & IScored)[] = [];

    for ( let section of sections )
    {
        if ( section.isScored() )
        {
            result.push(section);
        }
    }

    return result;
}

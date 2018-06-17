import { ISection } from './chapter';
import { Score } from './score';


export interface IChapter
{
    readonly title : string;

    readonly sections : ISection[];
}

export interface ISection
{
    readonly tocEntry: JSX.Element;

    readonly content : JSX.Element;

    isScored() : this is IScoredSection;

    hasDifficulty() : this is IDifficultySection;

    readonly id : string;
}

export interface IDifficultySection extends ISection
{
    readonly difficulty : number;
}

export interface IScoredSection extends ISection
{
    readonly score : Score;
}

export function selectScoredSections(sections : ISection[]) : IScoredSection[]
{
    const result : IScoredSection[] = [];

    for ( let section of sections )
    {
        if ( section.isScored() )
        {
            result.push(section);
        }
    }

    return result;
}

import React from 'react';
import { Score, IScored } from './score';
import { IHasDifficulty } from './difficulty';


export interface IChapter
{
    readonly title : string;

    readonly sections : ISection[];
}

export abstract class ISection
{
    readonly abstract id : string;

    readonly abstract tocEntry: JSX.Element;

    get content() : JSX.Element { return <React.Fragment />; }

    abstract isScored() : this is IScored;

    abstract hasDifficulty() : this is IHasDifficulty;
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

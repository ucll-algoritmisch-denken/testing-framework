import React from 'react';
import { Score, IScored } from './score';
import { IHasDifficulty } from './difficulty';


export interface IChapter
{
    readonly title : string;

    readonly sections : ISection[];
}

export interface ISection
{
    readonly id : string;

    readonly tocEntry: JSX.Element;

    content : JSX.Element;

    isScored() : this is IScored;

    hasDifficulty() : this is IHasDifficulty;
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

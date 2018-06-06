import { IChapter } from "./chapter";


export class Shell
{
    constructor(private chapter : IChapter) { }

    runTests() : any
    {
        const results : any = {};

        for ( let section of this.chapter.sections )
        {
            if ( section.isScored() )
            {
                results[section.id] = { grade: section.score.grade, maximum: section.score.maximum };
            }
        }

        return { chapter: this.chapter.title, results };
    }
}

export function createShell(chapter : IChapter) : Shell
{
    return new Shell(chapter);
}
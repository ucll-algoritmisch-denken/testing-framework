import { IScoredSection } from "chapter";
import { Score } from "score";


export abstract class Exercise implements IScoredSection
{
    constructor(public tocEntry : JSX.Element) { }

    abstract content : JSX.Element;

    isScored() : this is IScoredSection
    {
        return true;
    }

    abstract score : Score;

    abstract id : string;
}

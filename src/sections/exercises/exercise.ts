import { IScoredSection } from "chapter";
import { Score } from "score";


export abstract class Exercise implements IScoredSection
{
    constructor(public id : string, public tocEntry : JSX.Element) { }

    abstract content : JSX.Element;

    isScored() : this is IScoredSection
    {
        return true;
    }

    abstract score : Score;
}

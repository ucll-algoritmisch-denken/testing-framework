import { SectionEntry } from "./section-entry";


export abstract class Entry
{
    public abstract isSection() : this is SectionEntry;

    public abstract render() : JSX.Element;
}
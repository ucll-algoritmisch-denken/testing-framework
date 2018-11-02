import { SectionEntry } from "./section-entry";
import { IEntry } from "../table-of-contents";


export abstract class Entry implements IEntry
{
    public abstract isSection() : this is SectionEntry;

    public abstract render() : JSX.Element;
}
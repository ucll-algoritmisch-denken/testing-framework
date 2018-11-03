/// <reference types="react" />
import { SectionEntry } from "./section-entry";
export declare abstract class Entry {
    abstract isSection(): this is SectionEntry;
    abstract render(): JSX.Element;
}

/// <reference types="react" />
import { ISection } from 'chapter';
import { Entry } from './entry';
export declare class SectionEntry extends Entry {
    section: ISection;
    constructor(section: ISection);
    render(): JSX.Element;
    isSection(): this is SectionEntry;
}

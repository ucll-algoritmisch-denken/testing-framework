import { IChapter } from "chapter";
export declare class Shell {
    private chapter;
    constructor(chapter: IChapter);
    runTests(): any;
}
export declare function createShell(chapter: IChapter): Shell;

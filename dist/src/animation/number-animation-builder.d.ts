import { IAnimation } from './animation';
export declare class NumberAnimationBuilder {
    private animation;
    constructor(initial: number);
    relativeTo(delta: number, duration: number): void;
    absoluteTo(to: number, duration: number): void;
    constant(duration: number): void;
    jump(to: number): void;
    build(): IAnimation<number>;
}

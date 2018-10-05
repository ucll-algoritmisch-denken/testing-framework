import { World } from './world';
import { Trace } from './trace';
import { CarState } from './car-state';
export declare class Simulation {
    readonly world: World;
    readonly maximumSteps?: number | undefined;
    readonly history: Trace;
    private crashed;
    constructor(world: World, initialCarState: CarState, maximumSteps?: number | undefined);
    readonly carState: CarState;
    moveCarForward(): void;
    private crash;
    turnCarLeft(): void;
    turnCarRight(): void;
    sensor(): boolean;
    destinationReached(): boolean;
    readonly isSuccessful: boolean;
    static parse(worldString: string, maximumSteps?: number): Simulation;
}

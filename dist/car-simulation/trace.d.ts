import { TraceStep } from './trace-step';
import { CarState } from './car-state';
export declare class Trace {
    readonly initialState: CarState;
    readonly steps: TraceStep[];
    constructor(initialState: CarState);
    readonly currentState: CarState;
}

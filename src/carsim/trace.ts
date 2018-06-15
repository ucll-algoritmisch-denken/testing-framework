import { TraceStep } from './trace-step';
import { CarState } from './car-state';


export class Trace
{
    public readonly steps : TraceStep[];

    constructor(public readonly initialState : CarState)
    {
        this.steps = [];
    }

    get currentState() : CarState
    {
        if ( this.steps.length > 0 )
        {
            return this.steps[this.steps.length-1].endState;
        }
        else
        {
            return this.initialState;
        }
    }
}
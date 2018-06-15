import { Position2D } from '../position2d';
import { Direction2D } from '../direction2d';
import { CarState } from './car-state';


export interface ITraceStepVisitor<T>
{
    forward(trace : ForwardTraceStep) : T;

    turnLeft(trace : TurnRightTraceStep) : T;

    turnRight(trace : TurnRightTraceStep) : T;
}

export abstract class TraceStep
{
    constructor(public readonly startState : CarState, public readonly endState : CarState) { }

    abstract visit<T>(visitor : ITraceStepVisitor<T>) : T;
}

export class ForwardTraceStep extends TraceStep
{
    constructor(public readonly from : Position2D, public readonly to : Position2D, public readonly direction : Direction2D)
    {
        super( new CarState(from, direction), new CarState(to, direction) );
    }

    visit<T>(visitor : ITraceStepVisitor<T>) : T
    {
        return visitor.forward(this);
    }
}

export class TurnLeftTraceStep extends TraceStep
{
    constructor(public readonly position : Position2D, public readonly from : Direction2D, public readonly to : Direction2D)
    {
        super( new CarState(position, from), new CarState(position, to) );
    }

    visit<T>(visitor : ITraceStepVisitor<T>) : T
    {
        return visitor.turnLeft(this);
    }
}

export class TurnRightTraceStep extends TraceStep
{
    constructor(public readonly position : Position2D, public readonly from : Direction2D, public readonly to : Direction2D)
    {
        super( new CarState(position, from), new CarState(position, to) );
    }
    
    visit<T>(visitor : ITraceStepVisitor<T>) : T
    {
        return visitor.turnRight(this);
    }
}
import { Position, Direction } from 'js-algorithms';
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
    constructor(public readonly from : Position, public readonly to : Position, public readonly direction : Direction)
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
    constructor(public readonly position : Position, public readonly from : Direction, public readonly to : Direction)
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
    constructor(public readonly position : Position, public readonly from : Direction, public readonly to : Direction)
    {
        super( new CarState(position, from), new CarState(position, to) );
    }
    
    visit<T>(visitor : ITraceStepVisitor<T>) : T
    {
        return visitor.turnRight(this);
    }
}
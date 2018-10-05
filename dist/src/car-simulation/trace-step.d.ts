import { Position, Direction } from 'js-algorithms';
import { CarState } from './car-state';
export interface ITraceStepVisitor<T> {
    forward(trace: ForwardTraceStep): T;
    turnLeft(trace: TurnRightTraceStep): T;
    turnRight(trace: TurnRightTraceStep): T;
}
export declare abstract class TraceStep {
    readonly startState: CarState;
    readonly endState: CarState;
    constructor(startState: CarState, endState: CarState);
    abstract visit<T>(visitor: ITraceStepVisitor<T>): T;
}
export declare class ForwardTraceStep extends TraceStep {
    readonly from: Position;
    readonly to: Position;
    readonly direction: Direction;
    constructor(from: Position, to: Position, direction: Direction);
    visit<T>(visitor: ITraceStepVisitor<T>): T;
}
export declare class TurnLeftTraceStep extends TraceStep {
    readonly position: Position;
    readonly from: Direction;
    readonly to: Direction;
    constructor(position: Position, from: Direction, to: Direction);
    visit<T>(visitor: ITraceStepVisitor<T>): T;
}
export declare class TurnRightTraceStep extends TraceStep {
    readonly position: Position;
    readonly from: Direction;
    readonly to: Direction;
    constructor(position: Position, from: Direction, to: Direction);
    visit<T>(visitor: ITraceStepVisitor<T>): T;
}

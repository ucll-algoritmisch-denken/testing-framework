import { Grid } from "./grid";
import { Position2D } from "./position2d";
import { Direction2D } from "./direction2d";
import * as _ from 'lodash';

export class CarCrashException extends Error { }

export class CarState
{
    constructor(public readonly position : Position2D, public readonly direction : Direction2D) { }
}

export abstract class Cell
{
    abstract canBeDrivenOnto : boolean;

    /**
     * Whether the sensor senses this cell.
     */
    abstract isSensed() : boolean;

    abstract isDestination() : boolean;
}

export class Wall extends Cell
{
    get canBeDrivenOnto() : boolean
    {
        return false;
    }

    isSensed() : boolean
    {
        return true;
    }

    isDestination() : boolean
    {
        return false;
    }
}

export class Empty extends Cell
{
    get canBeDrivenOnto() : boolean
    {
        return true;
    }

    isSensed() : boolean
    {
        return false;
    }

    isDestination() : boolean
    {
        return false;
    }
}

export class Destination extends Cell
{
    get canBeDrivenOnto() : boolean
    {
        return true;
    }

    isSensed() : boolean
    {
        return false;
    }

    isDestination() : boolean
    {
        return true;
    }
}

export class World
{
    private readonly grid : Grid<Cell>;

    constructor(width : number, height : number, initializer : (p : Position2D) => Cell)
    {
        this.grid = new Grid<Cell>(width, height, initializer);
    }

    at(position : Position2D) : Cell
    {
        return this.grid.at(position);
    }

    get width() : number
    {
        return this.grid.width;
    }

    get height() : number
    {
        return this.grid.height;
    }

    isValidPosition(position : Position2D) : boolean
    {
        return 0 <= position.x && position.x < this.width && 0 <= position.y && position.y < this.height;
    }
}

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

export class Simulation
{
    public readonly history : Trace;

    private crashed : boolean;

    constructor(public readonly world : World, initialCarState : CarState)
    {
        this.history = new Trace(initialCarState);
        this.crashed = false;
    }

    get carState() : CarState
    {
        return this.history.currentState;
    }

    moveCarForward() : void
    {
        const { position, direction } = this.carState;
        const newPosition = position.add(direction);

        if ( !this.world.isValidPosition(newPosition) || !this.world.at(newPosition).canBeDrivenOnto )
        {
            this.crash();
        }
        else
        {
            this.history.steps.push( new ForwardTraceStep(position, newPosition, direction) );
        }
    }

    private crash()
    {
        this.crashed = true;
        throw new CarCrashException();
    }

    turnCarLeft() : void
    {
        const { position, direction } = this.carState;
        const newDirection = direction.rotateCCW();

        this.history.steps.push( new TurnLeftTraceStep(position, direction, newDirection) );
    }

    turnCarRight() : void
    {
        const { position, direction } = this.carState;
        const newDirection = direction.rotateCW();

        this.history.steps.push( new TurnRightTraceStep(position, direction, newDirection) );
    }

    sensor() : boolean
    {
        const { position, direction } = this.carState;
        const sensorPosition = position.add(direction);

        return this.world.at(sensorPosition).isSensed();
    }

    get isSuccessful() : boolean
    {
        return !this.crashed && this.world.at(this.carState.position).isDestination();
    }

    static parse(str : string) : Simulation
    {
        const lines = str.trim().split('\n').map(s => s.trim().split(''));
        const height = lines.length;
        const width = lines[0].length;

        if ( ! _.every(lines, s => s.length === width) )
        {
            throw new Error("Invalid world");
        }
        else
        {
            let initialCarState : CarState | undefined;
            let destinationPresent = false;

            const world = new World(width, height, (position) => {
                const c = lines[height - position.y - 1][position.x];

                if ( c === '.' )
                {
                    return new Empty();
                }
                else if ( c === '*' )
                {
                    return new Wall();
                }
                else if ( c === '<' )
                {
                    registerInitialCarState(new CarState(position, new Direction2D(-1, 0)));

                    return new Empty();
                }
                else if ( c === '>' )
                {
                    registerInitialCarState(new CarState(position, new Direction2D(1, 0)));
                    
                    return new Empty();
                }
                else if ( c === '^' )
                {
                    registerInitialCarState(new CarState(position, new Direction2D(0, 1)));

                    return new Empty();
                }
                else if ( c === 'v' )
                {
                    registerInitialCarState(new CarState(position, new Direction2D(0, -1)));

                    return new Empty();
                }
                else if ( c === 'D' )
                {
                    destinationPresent = true;

                    return new Destination();
                }
                else
                {
                    throw new Error(`Invalid character ${c}`);
                }
            });

            if ( !initialCarState )
            {
                throw new Error("Missing initial car state");
            }
            else if ( !destinationPresent )
            {
                throw new Error("Missing destination");
            }
            else
            {
                return new Simulation(world, initialCarState);
            }

            function registerInitialCarState(s : CarState)
            {
                if ( initialCarState )
                {
                    throw new Error("Multiple initial car states");
                }
                else
                {
                    initialCarState = s;
                }
            }
        }
        
    }
}

export type functionality = "forward" | "turnLeft" | "turnRight" | "sensor";
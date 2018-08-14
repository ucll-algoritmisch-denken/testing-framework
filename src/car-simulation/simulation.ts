import { World } from './world';
import { Empty, Wall, Destination } from './cell';
import { Direction } from 'js-algorithms';
import { Trace } from './trace';
import { CarState } from './car-state';
import { ForwardTraceStep, TurnLeftTraceStep, TurnRightTraceStep } from './trace-step';
import { CarSimulationException } from './car-exception';
import { all } from 'js-algorithms';


export class Simulation
{
    public readonly history : Trace;

    private crashed : boolean;

    constructor(public readonly world : World, initialCarState : CarState, public readonly maximumSteps ?: number)
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
        
        throw new CarSimulationException();
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

    destinationReached() : boolean
    {
        const { position } = this.carState;

        return this.world.at(position).isDestination();
    }

    get isSuccessful() : boolean
    {
        return !this.crashed && this.world.at(this.carState.position).isDestination();
    }

    static parse(worldString : string, maximumSteps ?: number) : Simulation
    {
        const lines = worldString.trim().split('\n').map(s => s.trim().split(''));
        const height = lines.length;
        const width = lines[0].length;

        if ( ! all(lines, s => s.length === width) )
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
                    registerInitialCarState(new CarState(position, new Direction(-1, 0)));

                    return new Empty();
                }
                else if ( c === '>' )
                {
                    registerInitialCarState(new CarState(position, new Direction(1, 0)));
                    
                    return new Empty();
                }
                else if ( c === '^' )
                {
                    registerInitialCarState(new CarState(position, new Direction(0, 1)));

                    return new Empty();
                }
                else if ( c === 'v' )
                {
                    registerInitialCarState(new CarState(position, new Direction(0, -1)));

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
                return new Simulation(world, initialCarState, maximumSteps);
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

import React from 'react';
import * as CarSim from '../../car-simulation';
import { CarSimulationViewer } from '../../components/car-simulation-viewer';
import './car-exercise.scss';
import { IScoredSection } from '../../chapter';
import { Score } from '../../score';
import { Maybe } from 'tsmonad';
import { isString } from 'type';
import { Exercise } from './exercise';
import * as _ from 'lodash';


class CarExercise extends Exercise
{
    constructor(
        id : string,
        tocEntry : JSX.Element,
        private readonly simulations : CarSim.Simulation[],
        private readonly description : JSX.Element) 
    { 
        super(id, tocEntry);
    }

    get content() : JSX.Element
    {
        const me = this;

        return (
            <section className="car exercise">
                {this.description}
                {createTestCases()}
            </section>
        );


        function createTestCases() : JSX.Element[]
        {
            return me.simulations.map( createTestCase );
        }

        function createTestCase(simulation : CarSim.Simulation) : JSX.Element
        {
            const className = simulation.isSuccessful ? 'test-case success' : 'test-case failure';

            return (
                <div className={className}>
                    <CarSimulationViewer simulation={simulation} cellSize={64} animationSpeed={4} />
                </div>
            );
        }
    }

    isScored() : this is IScoredSection
    {
        return true;
    }

    get score() : Score
    {
        if ( this.simulations.every( simulation => simulation.isSuccessful ) )
        {
            return new Score(1, 1);
        }
        else
        {
            return new Score(0, 1);
        }
    }
}


function createCarLibrary(symbol : Symbol, simulation : CarSim.Simulation) : { [key : string] : (car : Symbol) => void }
{
    return {
        turnLeft: function(car : Symbol) {
            validateCar(car);
            simulation.turnCarLeft();
        },
        turnRight: function(car : Symbol) {
            validateCar(car);
            simulation.turnCarRight();
        },
        forward: function(car : Symbol) {
            validateCar(car);
            simulation.moveCarForward();
        },
        sensor: function(car : Symbol) {
            validateCar(car);
            return simulation.sensor();
        }
    };

    function validateCar(car : Symbol)
    {
        if ( car !== symbol )
        {
            throw new Error("Dude, where's your car?");
        }
    }
}

function executeInstructions(simulation : CarSim.Simulation, testedFunction : (symbol : Symbol) => void, functionality : string[])
{
    const carSymbol = Symbol();
    const library = createCarLibrary(carSymbol, simulation);
    const wnd : any = window;
    const backup : any = {};

    for ( const f of functionality )
    {
        if ( !library[f] )
        {
            throw new Error(`Bug in tests: unknown car functionality ${f}`);
        }
        else
        {
            backup[f] = wnd[f];
            wnd[f] = library[f];
        }
    }

    try
    {
        testedFunction(carSymbol);
    }
    catch ( e )
    {
        if ( !(e instanceof CarSim.CarCrashException ) )
        {
            throw e;
        }
    }

    for ( const f of functionality )
    {
        wnd[f] = backup[f];
    }
}


export const functionality = {
    turnLeft: 'turnLeft',
    turnRight: 'turnRight',
    forward: 'forward',
    sensor: 'sensor'
};

export function parseSimulations(...strings : string[])
{
    return strings.map(CarSim.Simulation.parse);
}

export type functionality = ("forward" | "turnLeft" | "turnRight" | "sensor");

export interface IBuilder
{
    header : JSX.Element;

    description : JSX.Element;
    
    addSimulation(simulation : CarSim.Simulation | string) : void;

    functionality : functionality[];
}

class Builder implements IBuilder
{
    private simulations : CarSim.Simulation[];
    
    private __functionality : functionality[];

    constructor(private id : string, private testedFunction : Maybe<() => void>)
    {
        this.simulations = [];
        this.header = (
            <React.Fragment>
                Car Simulation
            </React.Fragment>
        );
        this.__functionality = [];
        this.description = <React.Fragment></React.Fragment>;
    }

    addSimulation(simulation : CarSim.Simulation | string) : void
    {
        this.simulations.push( convertToSimulation(simulation) );

        function convertToSimulation(simulation : CarSim.Simulation | string) : CarSim.Simulation
        {
            if ( isString(simulation) )
            {
                return CarSim.Simulation.parse(simulation);
            }
            else
            {
                return simulation;
            }
        }
    }

    header : JSX.Element;

    description : JSX.Element;

    get functionality() : functionality[]
    {
        return this.__functionality;
    }

    set functionality(fs : functionality[])
    {
        this.__functionality = _.uniq(fs);
    }

    build() : CarExercise
    {
        if ( this.simulations.length ===  0 )
        {
            throw new Error("No simulations specified");
        }
        if ( this.functionality.length === 0 )
        {
            throw new Error("No functionality specified");
        }
        else
        {
            this.testedFunction.lift( f => {
                this.simulations.forEach( simulation => executeInstructions(simulation, f, this.functionality) );
            } );

            const tocEntry = (
                <React.Fragment>
                    {this.id}
                </React.Fragment>
            );

            return new CarExercise(
                this.id,
                tocEntry,
                this.simulations,
                this.description
            );
        }
    }
}

export function build(id : string, testedFunction : Maybe<() => void>, func : (builder : IBuilder) => void) : IScoredSection
{
    const builder = new Builder(id, testedFunction);
    func(builder);
    return builder.build();
}

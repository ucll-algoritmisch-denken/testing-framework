import React from 'react';
import * as CarSim from '../../carsim';
import { functionality } from '../../carsim';
import { CarSimulationViewer } from '../../components/car-simulation-viewer';
import './car-exercise.scss';
import { IScoredSection } from '../../chapter';
import { Score } from '../../score';
import { Maybe } from 'tsmonad';
import { isString } from 'type';
import { Exercise } from './exercise';
import * as _ from 'lodash';
import { Outcome } from '../../outcome';
import { CarSimulationSummary } from 'components/car-simulation-summary';


class CarExercise extends Exercise
{
    constructor(
        id : string,
        tocEntry : JSX.Element,
        private readonly testedFunction : Maybe<() => void>,
        private readonly simulations : CarSim.Simulation[],
        private readonly description : JSX.Element,
        private readonly allowedFunctionality : functionality[])
    { 
        super(id, tocEntry);
    }

    get content() : JSX.Element
    {
        const me = this;
        const contents = (
            <React.Fragment>
                {this.createDescriptionContainer(this.description)}
                <CarSimulationSummary allowedFunctionality={this.allowedFunctionality} maxSteps={this.simulations[0].maximumSteps} />
                {this.createTestCasesContainer(createTestCases())}
            </React.Fragment>
        );

        return this.createExerciseContainer("car", contents);


        function createTestCases() : JSX.Element
        {
            return (
                <React.Fragment>
                    {me.simulations.map( createTestCase )}
                </React.Fragment>
            );
        }

        function createTestCase(simulation : CarSim.Simulation) : JSX.Element
        {
            const className = simulation.isSuccessful ? 'test-case success' : 'test-case failure';
            const content = (
                <CarSimulationViewer simulation={simulation} cellSize={64} animationSpeed={4} />
            );

            return me.createTestCaseContainer(determineOutcome(), content);


            function determineOutcome() : Outcome
            {
                return me.testedFunction.caseOf({
                    just: _ => simulation.isSuccessful ? Outcome.Pass : Outcome.Fail,
                    nothing: () => Outcome.Skip
                });
            }
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
        if ( !(e instanceof CarSim.CarSimulationException ) )
        {
            throw e;
        }
    }

    for ( const f of functionality )
    {
        wnd[f] = backup[f];
    }
}


export function parseSimulations(...strings : string[])
{
    return strings.map(CarSim.Simulation.parse);
}

export interface IBuilder
{
    header : JSX.Element;

    description : JSX.Element;
    
    addSimulation(world : string, maximumSteps ?: number) : void;

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

    addSimulation(world : string, maximumSteps ?: number) : void
    {
        this.simulations.push( CarSim.Simulation.parse(world, maximumSteps) );
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
                this.testedFunction,
                this.simulations,
                this.description,
                this.__functionality
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

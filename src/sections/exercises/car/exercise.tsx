import React from 'react';
import { Exercise as BaseExercise, ITestCase } from "../coding";
import { Outcome } from '../../../outcome';
import { IHasDifficulty, difficulty } from '../../../difficulty';
import { IScored, Score } from '../../../score';
import { CarSimulationSummary } from '../../../components/car-simulation-summary';
import { functionality, Simulation, CarSimulationException } from '../../../car-simulation';
import { Lazy } from '../../../lazy';
import { CarSimulationViewer } from '../../../components/car-simulation-viewer';
import { Maybe } from 'maybe';
import { SourceCode } from '../../../source-code';
import { Solution } from '../../../solution-pack';


function createCarLibrary(symbol : Symbol, simulation : Simulation) : { [key : string] : (car : Symbol) => void }
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
        },
        destinationReached: function(car : Symbol) {
            validateCar(car);
            return simulation.destinationReached();
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

function executeInstructions(simulation : Simulation, testedFunction : (symbol : Symbol) => void, functionality : functionality[])
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
        if ( !(e instanceof CarSimulationException ) )
        {
            throw e;
        }
    }

    for ( const f of functionality )
    {
        wnd[f] = backup[f];
    }
}

export abstract class Exercise extends BaseExercise implements IHasDifficulty, IScored
{
    protected abstract readonly description : JSX.Element;

    protected get hint() : JSX.Element | null { return null; }

    protected abstract get solutions() : Solution<any[], any>[];

    public abstract readonly difficulty : difficulty;

    protected abstract readonly availableFunctionality : functionality[];
    
    protected abstract generateSimulations() : Iterable<Simulation>;

    protected abstract readonly testedFunction : Maybe<() => void>;

    protected abstract readonly carImage : string;

    protected abstract readonly functionName : string;
    
    private readonly simulations : Lazy<Simulation[]>;

    constructor()
    {
        super();

        this.simulations = new Lazy( () => {
            const simulations = Array.from(this.generateSimulations());

            this.testedFunction.lift( f => {
                for ( let simulation of simulations )
                {
                    executeInstructions(simulation, f, this.availableFunctionality);
                }
            } );

            return simulations;
        } );
    }

    public get id() : string
    {
        return this.functionName;
    }

    public tocEntry = (
        <React.Fragment>
            {this.functionName}
        </React.Fragment>
    );

    protected header = (
        <React.Fragment>
            {this.functionName}
        </React.Fragment>
    );

    protected get exerciseContent() : JSX.Element
    {
        return (
            <React.Fragment>
                {this.renderTestCases()}
                {this.renderAvailableFunctionality()}
                {this.renderDescription()}
                {this.renderHint()}
                {this.renderSolution()}
            </React.Fragment>
        );
    }

    protected get cellSize() : number
    {
        return 64;
    }

    protected parseSimulation(string : string) : Simulation
    {
        return Simulation.parse(string);
    }

    protected renderAvailableFunctionality() : JSX.Element
    {
        return (
            <CarSimulationSummary allowedFunctionality={this.availableFunctionality} maxSteps={this.simulations.value[0].maximumSteps} />
        );
    }

    protected get htmlClasses() : string[]
    {
        return super.htmlClasses.concat('car');
    }

    protected *generateTestCases() : Iterable<ITestCase>
    {
        const me = this;

        for ( let simulation of this.simulations.value )
        {
            yield new class implements ITestCase
            {
                public get outcome() : Outcome
                {
                    return me.testedFunction.caseOf({
                        just: _ => simulation.isSuccessful ? Outcome.Pass : Outcome.Fail,
                        nothing: () => Outcome.Skip
                    });
                }

                public render() : JSX.Element
                {
                    return (
                        <CarSimulationViewer simulation={simulation} cellSize={me.cellSize} animationSpeed={4} carImage={me.carImage} />
                    );
                }
            };
        }
    }
}

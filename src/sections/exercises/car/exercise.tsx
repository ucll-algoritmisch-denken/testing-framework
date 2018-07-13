import React from 'react';
import classNames from 'classnames';
import Collapsible from 'react-collapsible';
import { Exercise as BaseExercise } from "../exercise";
import { outcomeToHtmlClass, combineAssertionOutcomes, Outcome } from 'outcome';
import { IHasDifficulty, difficulty } from 'difficulty';
import { IScored, Score } from 'score';
import { CarSimulationSummary } from 'components/car-simulation-summary';
import { functionality, Simulation, CarSimulationException } from 'car-simulation';
import { Lazy } from 'lazy';
import { CarSimulationViewer } from 'components/car-simulation-viewer';
import { Maybe } from 'monad';


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

function executeInstructions(simulation : Simulation, testedFunction : (symbol : Symbol) => void, functionality : string[])
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

    protected get solution() : string | null { return null; }

    public abstract readonly difficulty : difficulty;

    protected abstract readonly availableFunctionality : functionality[];
    
    protected abstract generateSimulations() : Iterable<Simulation>;

    protected abstract readonly testedFunction : Maybe<() => void>;

    protected abstract readonly carImage : string;
    
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

    public hasDifficulty() : this is IHasDifficulty
    {
        return true;
    }

    public isScored() : this is IScored
    {
        return true;
    }

    protected get maximumScore() : number
    {
        return 1;
    }

    public get score() : Score
    {
        if ( this.simulations.value.every( simulation => simulation.isSuccessful ) )
        {
            return new Score(this.maximumScore, this.maximumScore);
        }
        else
        {
            return new Score(0, this.maximumScore);
        }
    }

    protected parseSimulation(string : string) : Simulation
    {
        return Simulation.parse(string);
    }

    protected get exerciseContent() : JSX.Element
    {
        return (
            <React.Fragment>
                {this.renderDescription()}
                {this.renderAvailableFunctionality()}
                {this.renderTestCases()}
            </React.Fragment>
        );
    }    

    protected renderAvailableFunctionality() : JSX.Element
    {
        return (
            <CarSimulationSummary allowedFunctionality={this.availableFunctionality} maxSteps={this.simulations.value[0].maximumSteps} />
        );
    }

    protected renderDescription() : JSX.Element
    {
        return (
            <div className="description">
                {this.description}
            </div>
        );
    }

    protected get htmlClasses() : string[]
    {
        return super.htmlClasses.concat('car');
    }

    protected renderTestCases() : JSX.Element
    {
        return (
            <React.Fragment>
                {this.simulations.value.map( (simulation) => this.createTestCase(simulation) )}
            </React.Fragment>
        );
    }

    protected createTestCase(simulation : Simulation) : JSX.Element
    {
        const me = this;
        const className = simulation.isSuccessful ? 'test-case success' : 'test-case failure';

        return (
            <CarSimulationViewer simulation={simulation} cellSize={64} animationSpeed={4} carImage={this.carImage} />
        );


        function determineOutcome() : Outcome
        {
            return me.testedFunction.caseOf({
                just: _ => simulation.isSuccessful ? Outcome.Pass : Outcome.Fail,
                nothing: () => Outcome.Skip
            });
        }
    }
}

// class CarExercise extends Exercise implements IHasDifficulty
// {
//     constructor(
//         id : string,
//         tocEntry : JSX.Element,
//         public readonly difficulty : difficulty,
//         private readonly header : JSX.Element,
//         private readonly testedFunction : Maybe<() => void>,
//         private readonly simulations : CarSim.Simulation[],
//         private readonly description : JSX.Element,
//         private readonly allowedFunctionality : functionality[],
//         private readonly carImage : string)
//     { 
//         super(id, tocEntry);
//     }

//     hasDifficulty() : this is IHasDifficulty
//     {
//         return true;
//     }

//     get content() : JSX.Element
//     {
//         const me = this;
//         const contents = (
//             <React.Fragment>
//                 {createHeader()}
//                 {this.createDescriptionContainer(this.description)}
//                 <CarSimulationSummary allowedFunctionality={this.allowedFunctionality} maxSteps={this.simulations[0].maximumSteps} />
//                 {this.createTestCasesContainer(createTestCases())}
//             </React.Fragment>
//         );

//         return this.createExerciseContainer("car", contents);


//         function createHeader()
//         {
//             return me.createExerciseHeader(me.header);
//         }

//         function createTestCases() : JSX.Element
//         {
//             return (
//                 <React.Fragment>
//                     {me.simulations.map( createTestCase )}
//                 </React.Fragment>
//             );
//         }

//         function createTestCase(simulation : CarSim.Simulation) : JSX.Element
//         {
//             const className = simulation.isSuccessful ? 'test-case success' : 'test-case failure';
//             const content = (
//                 <CarSimulationViewer simulation={simulation} cellSize={64} animationSpeed={4} carImage={me.carImage} />
//             );

//             return me.createTestCaseContainer(determineOutcome(), content);


//             function determineOutcome() : Outcome
//             {
//                 return me.testedFunction.caseOf({
//                     just: _ => simulation.isSuccessful ? Outcome.Pass : Outcome.Fail,
//                     nothing: () => Outcome.Skip
//                 });
//             }
//         }
//     }

//     isScored() : this is IScored
//     {
//         return true;
//     }

//     get score() : Score
//     {
//         if ( this.simulations.every( simulation => simulation.isSuccessful ) )
//         {
//             return new Score(1, 1);
//         }
//         else
//         {
//             return new Score(0, 1);
//         }
//     }
// }





// export function parseSimulations(...strings : string[])
// {
//     return strings.map(CarSim.Simulation.parse);
// }

// export interface IBuilder
// {
//     header : JSX.Element;

//     description : JSX.Element;

//     difficulty : difficulty;
    
//     addSimulation(world : string, maximumSteps ?: number) : void;

//     functionality : functionality[];

//     carImage ?: string;
// }

// class Builder implements IBuilder
// {
//     private simulations : CarSim.Simulation[];
    
//     private __functionality : functionality[];

//     constructor(private id : string, private testedFunction : Maybe<() => void>)
//     {
//         this.simulations = [];
//         this.header = (
//             <React.Fragment>
//                 Car Simulation
//             </React.Fragment>
//         );
//         this.__functionality = [];
//         this.description = <React.Fragment></React.Fragment>;
//     }

//     addSimulation(world : string, maximumSteps ?: number) : void
//     {
//         this.simulations.push( CarSim.Simulation.parse(world, maximumSteps) );
//     }

//     header : JSX.Element;

//     description : JSX.Element;

//     carImage ?: string;

//     private __difficulty ?: number;

//     set difficulty(value : number)
//     {
//         if ( !isInteger(value) )
//         {
//             throw new Error(`Difficulty should be integer`);
//         }
//         else
//         {
//             this.__difficulty = value;
//         }
//     }

//     get functionality() : functionality[]
//     {
//         return this.__functionality;
//     }

//     set functionality(fs : functionality[])
//     {
//         this.__functionality = _.uniq(fs);
//     }

//     build() : CarExercise
//     {
//         if ( this.simulations.length ===  0 )
//         {
//             throw new Error("No simulations specified");
//         }
//         else if ( this.functionality.length === 0 )
//         {
//             throw new Error("No functionality specified");
//         }
//         else if ( !this.carImage )
//         {
//             throw new Error("No car image specified");
//         }
//         else if ( !this.__difficulty )
//         {
//             throw new Error(`Missing difficulty`);
//         }
//         else
//         {
//             this.testedFunction.lift( f => {
//                 this.simulations.forEach( simulation => executeInstructions(simulation, f, this.functionality) );
//             } );

//             const tocEntry = (
//                 <React.Fragment>
//                     {this.id}
//                 </React.Fragment>
//             );

//             return new CarExercise(
//                 this.id,
//                 tocEntry,
//                 this.__difficulty,
//                 this.header,
//                 this.testedFunction,
//                 this.simulations,
//                 this.description,
//                 this.__functionality,
//                 this.carImage
//             );
//         }
//     }
// }

// export function build(id : string, testedFunction : Maybe<() => void>, func : (builder : IBuilder) => void) : ISection
// {
//     const builder = new Builder(id, testedFunction);
//     func(builder);
//     return builder.build();
// }

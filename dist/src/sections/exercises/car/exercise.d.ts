import { Exercise as BaseExercise, ITestCase } from "../coding";
import { IHasDifficulty, difficulty } from '../../../difficulty';
import { IScored } from '../../../score';
import { functionality, Simulation } from '../../../car-simulation';
import { Maybe } from 'maybe';
import { Solution } from '../../../solution-pack';
export declare abstract class Exercise extends BaseExercise implements IHasDifficulty, IScored {
    protected abstract readonly description: JSX.Element;
    protected readonly hint: JSX.Element | null;
    protected abstract readonly solutions: Solution<any[], any>[];
    abstract readonly difficulty: difficulty;
    protected abstract readonly availableFunctionality: functionality[];
    protected abstract generateSimulations(): Iterable<Simulation>;
    protected abstract readonly testedFunction: Maybe<() => void>;
    protected abstract readonly carImage: string;
    protected abstract readonly functionName: string;
    private readonly simulations;
    constructor();
    readonly id: string;
    tocEntry: JSX.Element;
    protected header: JSX.Element;
    protected readonly exerciseContent: JSX.Element;
    protected readonly cellSize: number;
    protected parseSimulation(string: string): Simulation;
    protected renderAvailableFunctionality(): JSX.Element;
    protected readonly htmlClasses: string[];
    protected generateTestCases(): Iterable<ITestCase>;
}

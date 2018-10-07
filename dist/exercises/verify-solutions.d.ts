import { ISolutionPack } from "../solution-pack";
import { IExercise } from "./exercise";
export declare function verifySolutions<Ps extends any[], R>(exerciseFactory: (testedImplementation: (...args: Ps) => R) => IExercise, solutionPack: ISolutionPack<Ps, R>): void;

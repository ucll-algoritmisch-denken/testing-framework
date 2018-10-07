import { retrieveSolutions, ISolutionPack } from "../solution-pack";
import { IExercise } from "./exercise";
import { configuration } from "configuration";


export function verifySolutions<Ps extends any[], R>(exerciseFactory : (testedImplementation : (...args : Ps) => R) => IExercise, solutionPack : ISolutionPack<Ps, R>)
{
    if ( configuration.verifySolutions )
    {
        for ( const solution of retrieveSolutions(solutionPack) )
        {
            const implementation = solution.implementation;
            const exercise = exerciseFactory(implementation);
            
            if ( !exercise.score.isPerfect )
            {
                throw new Error(`Invalid solution found!\n${implementation.toString()}`);
            }
        }
    }
}

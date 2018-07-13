import { IAssertion } from '.';
import { ComparisonAssertion } from './comparison';
import { Maybe } from 'monad';


export abstract class ApproximatelyAssertion extends ComparisonAssertion<number>
{
    protected abstract readonly epsilon : number;

    protected isCorrect(actual: number): boolean
    {
        if ( this.expected.isJust() )
        {
            return Math.abs(actual - this.expected.value) < this.epsilon;
        }
        else
        {
            throw new Error(`Bug detected in testing framework`);
        }
    }
}

export function approximately(expected : number, epsilon : number = 0.0001) : IAssertion<number>
{
    return new class extends ApproximatelyAssertion
    {
        protected get epsilon() : number
        {
            return epsilon;
        }

        protected get original() : Maybe<number>
        {
            return Maybe.nothing();
        }
        
        protected get expected() : Maybe<number>
        {
            return Maybe.just(expected);
        }
    };
}
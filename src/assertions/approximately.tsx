import { IAssertion } from '../assertions';
import { ComparisonAssertion } from './comparison';
import { Maybe } from '../monad';


export abstract class ApproximatelyAssertion extends ComparisonAssertion<number>
{
    protected get epsilon()
    {
        return 0.0001;
    }

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

export function approximately(expected : number) : IAssertion<number>
{
    return new class extends ApproximatelyAssertion
    {
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
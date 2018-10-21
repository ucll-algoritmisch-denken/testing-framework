import { IAssertion } from '.';
import { deepEqual } from '../equality';
import { ComparisonAssertion } from './comparison';
import { Maybe } from 'maybe';


export abstract class EqualityAssertion<T> extends ComparisonAssertion<T>
{
    protected isCorrect(actual: T): boolean
    {
        if ( this.expected.isJust() )
        {
            return deepEqual(this.expected.value, actual);
        }
        else
        {
            throw new Error(`Bug detected in testing framework`);
        }
    }
}

export function equality<T>(expected : T, original : Maybe<T>) : IAssertion<T>
{
    return new class extends EqualityAssertion<T>
    {
        protected get original() : Maybe<T>
        {
            return original;
        }
        
        protected get expected() : Maybe<T>
        {
            return Maybe.just(expected);
        }
    };
}

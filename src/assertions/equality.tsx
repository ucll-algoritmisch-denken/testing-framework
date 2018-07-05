import { IAssertion } from '../assertions';
import { deepEqual } from '../equality';
import { Maybe } from 'tsmonad';
import { ComparisonAssertion } from './comparison';


export abstract class EqualityAssertion<T> extends ComparisonAssertion<T>
{
    protected isCorrect(actual: T): boolean
    {
        return deepEqual(this.expected.valueOrThrow(), actual);
    }
}

export function equality<T>(expected : T) : IAssertion<T>
{
    return new class extends EqualityAssertion<T>
    {
        protected get original() : Maybe<T>
        {
            return Maybe.nothing();
        }
        
        protected get expected() : Maybe<T>
        {
            return Maybe.just(expected);
        }
    };
}
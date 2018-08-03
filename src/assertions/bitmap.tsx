import * as Formatters from 'formatters/jsx-formatters';
import { IAssertion } from './assertion';
import { EqualityAssertion } from './equality';
import { Maybe } from 'maybe';
import { Color } from '../imaging';


export function blackAndWhiteBitmap(expected : boolean[][], original ?: boolean[][]) : IAssertion<boolean[][]>
{
    return new class extends EqualityAssertion<boolean[][]>
    {
        protected get original() : Maybe<boolean[][]>
        {
            if ( original )
            {
                return Maybe.just(original);
            }
            else
            {
                return Maybe.nothing();
            }
        }

        protected get expected() : Maybe<boolean[][]>
        {
            return Maybe.just(expected);
        }

        protected renderValue(pixels : boolean[][]) : JSX.Element
        {
            return Formatters.blackAndWhiteBitmap(pixels);
        }
    };
}

export function grayscaleBitmap(expected : number[][], original ?: number[][]) : IAssertion<number[][]>
{
    return new class extends EqualityAssertion<number[][]>
    {
        protected get original() : Maybe<number[][]>
        {
            if ( original )
            {
                return Maybe.just(original);
            }
            else
            {
                return Maybe.nothing();
            }
        }

        protected get expected() : Maybe<number[][]>
        {
            return Maybe.just(expected);
        }

        protected renderValue(pixels : number[][]) : JSX.Element
        {
            return Formatters.grayscaleBitmap(pixels);
        }
    };
}

export function colorBitmap(expected : Color[][], original ?: Color[][]) : IAssertion<Color[][]>
{
    return new class extends EqualityAssertion<Color[][]>
    {
        protected get original() : Maybe<Color[][]>
        {
            if ( original )
            {
                return Maybe.just(original);
            }
            else
            {
                return Maybe.nothing();
            }
        }

        protected get expected() : Maybe<Color[][]>
        {
            return Maybe.just(expected);
        }

        protected renderValue(pixels : Color[][]) : JSX.Element
        {
            return Formatters.rgbBitmap(pixels);
        }
    };
}

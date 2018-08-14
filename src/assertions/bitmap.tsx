import * as Formatters from '../formatters/jsx-formatters';
import { IAssertion } from './assertion';
import { EqualityAssertion } from './equality';
import { Maybe } from 'maybe';
import { Color } from '../imaging';


export class BlackAndWhiteBitmap extends EqualityAssertion<boolean[][]>
{
    constructor(expected : boolean[][])
    {
        super();

        this.expected = Maybe.just(expected);
    }

    protected renderValue(pixels : boolean[][]) : JSX.Element
    {
        return Formatters.blackAndWhiteBitmap(pixels);
    }

    protected get original() : Maybe<boolean[][]>
    {
        return Maybe.nothing();
    }

    public expected : Maybe<boolean[][]>;
}

export class GrayscaleBitmap extends EqualityAssertion<number[][]>
{
    constructor(expected : number[][])
    {
        super();

        this.expected = Maybe.just(expected);
    }

    protected renderValue(pixels : number[][]) : JSX.Element
    {
        return Formatters.grayscaleBitmap(pixels);
    }

    protected get original() : Maybe<number[][]>
    {
        return Maybe.nothing();
    }

    public expected : Maybe<number[][]>;
}

export class ColorBitmap extends EqualityAssertion<Color[][]>
{
    constructor(expected : Color[][])
    {
        super();

        this.expected = Maybe.just(expected);
    }

    protected renderValue(pixels : Color[][]) : JSX.Element
    {
        return Formatters.rgbBitmap(pixels);
    }

    protected get original() : Maybe<Color[][]>
    {
        return Maybe.nothing();
    }

    public expected : Maybe<Color[][]>;
}

import { Animation, IAnimation } from './animation';


class Constant<T> extends Animation<T>
{
    constructor(private value : T, public duration : number)
    {
        super();
    }

    at(t : number) : T
    {
        if ( t < 0 || t > this.duration )
        {
            throw new Error(`Invalid t = ${t}`);
        }
        else
        {
            return this.value;
        }
    }

    get endValue() : T
    {
        return this.value;
    }
}

export function constant<T>(value : T, duration : number) : IAnimation<T>
{
    return new Constant<T>(value, duration);
}

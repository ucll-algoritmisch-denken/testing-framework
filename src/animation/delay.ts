import { Animation, IAnimation } from './animation';


class Delay<T> extends Animation<T>
{
    constructor(private delayed : IAnimation<T>, private delay : number)
    {
        super();

        this.duration = delayed.duration + delay;
    }

    at(t : number) : T
    {
        if ( t < 0 || t > this.duration )
        {
            throw new Error(`Invalid t = ${t}`);
        }
        else
        {
            return this.delayed.at(t - this.delay);
        }
    }

    duration : number;
}

export function delay<T>(animation : IAnimation<T>, dt : number) : IAnimation<T>
{
    return new Delay<T>(animation, dt);
}

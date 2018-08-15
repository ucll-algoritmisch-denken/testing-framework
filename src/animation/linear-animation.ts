import { Animation, IAnimation } from './animation';


class LinearAnimation extends Animation<number>
{
    constructor(private readonly from : number, public readonly to : number, public readonly duration : number)
    {
        super();
    }

    at(t : number) : number
    {
        if ( t < 0 || t > this.duration )
        {
            throw new Error(`Invalid t = ${t}`);
        }
        else
        {
            return this.from + (this.to - this.from) * t / this.duration;
        }
    }
}

export function linear(from : number, to : number, duration : number) : IAnimation<number>
{
    return new LinearAnimation(from, to, duration);
}

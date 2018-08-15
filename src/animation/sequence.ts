import { Animation, IAnimation } from './animation';
import { sum } from 'js-algorithms';


class Sequence<T> extends Animation<T>
{
    constructor(private readonly children : IAnimation<T>[])
    {
        super();

        this.duration = sum(children.map(child => child.duration));
    }

    readonly duration : number;
    
    get endValue() : T
    {
        const lastChild = this.children[this.children.length - 1];

        return lastChild.endValue;
    }

    at(t : number) : T
    {
        if ( t < 0 || t > this.duration )
        {
            throw new Error(`Invalid t = ${t}`);
        }
        else
        {
            let i = 0;

            // Extra i < length check necessary for rounding errors. t might be slightly too large
            while ( i < this.children.length && t > this.children[i].duration )
            {
                t -= this.children[i].duration;
                ++i;
            }

            if ( i === this.children.length )
            {
                if ( t > 0.00001 )
                {
                    throw new Error(`Bug, should not happen`);
                }
                else
                {
                    const lastChild = this.children[this.children.length - 1];

                    return lastChild.at( lastChild.duration );
                }
            }
            else
            {
                return this.children[i].at(t);
            }
        }
    }
}

export function sequence<T>(...animations : IAnimation<T>[])
{
    return new Sequence<T>(animations);
}
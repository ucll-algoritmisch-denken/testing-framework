import * as _ from 'lodash';


export interface IAnimation<T>
{
    at(t : number) : T;

    readonly duration : number;

    readonly endValue : T;
}

abstract class Animation<T> implements IAnimation<T>
{
    abstract at(t : number) : T;

    abstract readonly duration : number;

    get endValue() : T
    {
        return this.at(this.duration);
    }
}


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

class Sequence<T> extends Animation<T>
{
    constructor(private readonly children : IAnimation<T>[])
    {
        super();

        this.duration = _.sum(children.map(child => child.duration));
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

class Map<U> extends Animation<U>
{
    constructor(private f : (...animations : IAnimation<any>[]) => U, private animations : IAnimation<any>[])
    {
        super();

        for ( let i = 1; i < animations.length; ++i )
        {
            if ( animations[i].duration !== animations[0].duration )
            {
                throw new Error("Animations should have same duration");
            }
        }

        this.duration = animations[0].duration;
    }

    readonly duration : number;

    get endValue() : U
    {
        return this.f(...this.animations.map(animation => animation.endValue));
    }

    at(t : number) : U
    {
        if ( t < 0 || t > this.duration )
        {
            throw new Error(`Invalid t = ${t}`);
        }
        else
        {
            return this.f(...this.animations.map(animation => animation.at(t)));
        }
    }
}

export function constant<T>(value : T, duration : number) : IAnimation<T>
{
    return new Constant<T>(value, duration);
}

export function appendJump<T>(animation : IAnimation<T>, value : T) : IAnimation<T>
{
    const appended = constant(value, 0);

    return sequence(animation, appended);
}

export function appendConstant<T>(animation : IAnimation<T>, duration : number) : IAnimation<T>
{
    const value = animation.endValue;
    const appended = constant(value, duration);

    return sequence(animation, appended);
}

export function linear(from : number, to : number, duration : number) : IAnimation<number>
{
    return new LinearAnimation(from, to, duration);
}

export function appendLinear(animation : IAnimation<number>, to : number, duration : number) : IAnimation<number>
{
    const from = animation.endValue;
    const appended = linear(from, to, duration);

    return sequence(animation, appended);
}

export function delay<T>(animation : IAnimation<T>, dt : number) : IAnimation<T>
{
    return new Delay<T>(animation, dt);
}

export function sequence<T>(...animations : IAnimation<T>[])
{
    return new Sequence<T>(animations);
}

export function map<T1, U>(f : (t1 : T1) => U, animation : IAnimation<T1>) : IAnimation<U>;
export function map<T1, T2, U>(f : (t1 : T1, t2 : T2) => U, a1 : IAnimation<T1>, a2 : IAnimation<T2>) : IAnimation<U>;
export function map<T1, T2, T3, U>(f : (t1 : T1, t2 : T2, t3 : T3) => U, a1 : IAnimation<T1>, a2 : IAnimation<T2>, a3 : IAnimation<T3>) : IAnimation<U>;
export function map<T1, T2, T3, T4, U>(f : (t1 : T1, t2 : T2, t3 : T3, t4 : T4) => U, a1 : IAnimation<T1>, a2 : IAnimation<T2>, a3 : IAnimation<T3>, a4 : IAnimation<T4>) : IAnimation<U>;
export function map<U>(f : (...args : any[]) => U, ...animations : IAnimation<any>[]) : IAnimation<U>
{
    return new Map<U>(f, animations);
}


export class NumberAnimationBuilder
{
    private animation : IAnimation<number>;

    constructor(initial : number)
    {
        this.animation = new Constant<number>(initial, 0);
    }

    relativeTo(delta : number, duration : number)
    {
        this.absoluteTo(this.animation.at(this.animation.duration) + delta, duration);
    }

    absoluteTo(to : number, duration : number)
    {
        this.animation = appendLinear(this.animation, to, duration);
    }

    constant(duration : number)
    {
        this.animation = appendConstant(this.animation, duration);
    }

    jump(to : number)
    {
        this.animation = appendJump(this.animation, to);
    }

    build() : IAnimation<number>
    {
        return this.animation;
    }
}
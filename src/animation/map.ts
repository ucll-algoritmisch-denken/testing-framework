import { Animation, IAnimation } from './animation';


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

export function map<T1, U>(f : (t1 : T1) => U, animation : IAnimation<T1>) : IAnimation<U>;
export function map<T1, T2, U>(f : (t1 : T1, t2 : T2) => U, a1 : IAnimation<T1>, a2 : IAnimation<T2>) : IAnimation<U>;
export function map<T1, T2, T3, U>(f : (t1 : T1, t2 : T2, t3 : T3) => U, a1 : IAnimation<T1>, a2 : IAnimation<T2>, a3 : IAnimation<T3>) : IAnimation<U>;
export function map<T1, T2, T3, T4, U>(f : (t1 : T1, t2 : T2, t3 : T3, t4 : T4) => U, a1 : IAnimation<T1>, a2 : IAnimation<T2>, a3 : IAnimation<T3>, a4 : IAnimation<T4>) : IAnimation<U>;
export function map<U>(f : (...args : any[]) => U, ...animations : IAnimation<any>[]) : IAnimation<U>
{
    return new Map<U>(f, animations);
}

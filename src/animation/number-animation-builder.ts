import { IAnimation } from './animation';
import { constant } from './constant';
import { sequence } from './sequence';
import { linear } from './linear-animation';


function appendJump<T>(animation : IAnimation<T>, value : T) : IAnimation<T>
{
    const appended = constant(value, 0);

    return sequence(animation, appended);
}

function appendConstant<T>(animation : IAnimation<T>, duration : number) : IAnimation<T>
{
    const value = animation.endValue;
    const appended = constant(value, duration);

    return sequence(animation, appended);
}

function appendLinear(animation : IAnimation<number>, to : number, duration : number) : IAnimation<number>
{
    const from = animation.endValue;
    const appended = linear(from, to, duration);

    return sequence(animation, appended);
}

export class NumberAnimationBuilder
{
    private animation : IAnimation<number>;

    constructor(initial : number)
    {
        this.animation = constant<number>(initial, 0);
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
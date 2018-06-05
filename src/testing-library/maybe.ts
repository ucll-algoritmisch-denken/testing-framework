import { isUndefined } from "testing-library/type";

export abstract class IMaybe<T>
{
    abstract hasValue() : this is Just<T>;

    abstract bind<U>(f : (x : T) => IMaybe<U>) : IMaybe<U>;

    static of<T>(x : T) : IMaybe<T>
    {
        return new Just<T>(x);
    }

    static nothing<T>() : IMaybe<T>
    {
        return new Nothing<T>();
    }

    static fromUndefined<T>(x : T | undefined) : IMaybe<T>
    {
        if ( isUndefined(x) )
        {
            return IMaybe.nothing<T>();
        }
        else
        {
            return IMaybe.of<T>(x);
        }
    }

    lift<U>(f : (t : T) => U) : IMaybe<U>
    {
        return this.bind(x => IMaybe.of(f(x)));
    }
}

export class Just<T> extends IMaybe<T>
{
    constructor(public value : T)
    {
        super();
    }

    hasValue() : this is Just<T>
    {
        return true;
    }

    bind<U>(f : (x : T) => IMaybe<U>) : IMaybe<U>
    {
        return f(this.value);
    }

}

export class Nothing<T> extends IMaybe<T>
{
    hasValue() : this is Just<T>
    {
        return false;
    }    

    bind<U>(_ : (x: T) => IMaybe<U>) : IMaybe<U>
    {
        return new Nothing<U>();
    }
}

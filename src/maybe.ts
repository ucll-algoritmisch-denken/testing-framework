import { isUndefined } from "./type";

export abstract class Maybe<T>
{
    abstract hasValue() : this is Just<T>;

    abstract bind<U>(f : (x : T) => Maybe<U>) : Maybe<U>;

    static of<T>(x : T) : Maybe<T>
    {
        return new Just<T>(x);
    }

    static nothing<T>() : Maybe<T>
    {
        return new Nothing<T>();
    }

    static fromUndefined<T>(x : T | undefined) : Maybe<T>
    {
        if ( isUndefined(x) )
        {
            return Maybe.nothing<T>();
        }
        else
        {
            return Maybe.of<T>(x);
        }
    }

    lift<U>(f : (t : T) => U) : Maybe<U>
    {
        return this.bind(x => Maybe.of(f(x)));
    }
}

export class Just<T> extends Maybe<T>
{
    constructor(public value : T)
    {
        super();
    }

    hasValue() : this is Just<T>
    {
        return true;
    }

    bind<U>(f : (x : T) => Maybe<U>) : Maybe<U>
    {
        return f(this.value);
    }

}

export class Nothing<T> extends Maybe<T>
{
    hasValue() : this is Just<T>
    {
        return false;
    }    

    bind<U>(_ : (x: T) => Maybe<U>) : Maybe<U>
    {
        return new Nothing<U>();
    }
}

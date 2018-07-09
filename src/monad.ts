export abstract class Maybe<T>
{
    public static just<T>(x : T) : Maybe<T>
    {
        return new Just<T>(x);
    }

    public static nothing<T>() : Maybe<T>
    {
        return new Nothing<T>();
    }

    abstract bind<U>(f : (t : T) => Maybe<U>) : Maybe<U>;

    abstract lift<U>(f : (t : T) => U) : Maybe<U>;

    abstract caseOf<U>( cases : { just: (t : T) => U, nothing: () => U } ) : U;

    abstract isJust() : this is Just<T>;
}

export class Just<T> extends Maybe<T>
{
    constructor(public value : T)
    {
        super();
    }

    bind<U>(f : (t : T) => Maybe<U>) : Maybe<U>
    {
        return f(this.value);
    }

    lift<U>(f : (t : T) => U) : Maybe<U>
    {
        return Maybe.just<U>( f(this.value) );
    }

    caseOf<U>( cases : { just: (t : T) => U, nothing: () => U } ) : U
    {
        return cases.just(this.value);
    }

    isJust() : this is Just<T>
    {
        return true;
    }
}

export class Nothing<T> extends Maybe<T>
{
    bind<U>(_ : (t : T) => Maybe<U>) : Maybe<U>
    {
        return Maybe.nothing<U>();
    }

    lift<U>(f : (t : T) => U) : Maybe<U>
    {
        return Maybe.nothing<U>();
    }

    caseOf<U>( cases : { just: (t : T) => U, nothing: () => U } ) : U
    {
        return cases.nothing();
    }

    isJust() : this is Just<T>
    {
        return false;
    }
}
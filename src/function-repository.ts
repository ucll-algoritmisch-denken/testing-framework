import { Maybe, MaybePartial, maybePartial } from 'maybe';


export interface IFunctionRepository
{
    // TODO Remove this
    fetch(name : string) : Maybe<((...args : any[]) => any)>;

    typedFetch<T>(name : string) : Maybe<T>;

    typedFetchObject<T>(name : string) : MaybePartial<T>;
}

class ObjectFunctionRepository implements IFunctionRepository
{
    constructor(private obj : any) { }

    // TODO Remove untyped fetch
    fetch(name : string) : Maybe<((...args : any[]) => any)>
    {
        if ( this.obj[name] )
        {
            return Maybe.just( this.obj[name] );
        }
        else
        {
            return Maybe.nothing();
        }
    }

    typedFetch<T>(name : string) : Maybe<T>
    {
        if ( this.obj[name] )
        {
            return Maybe.just( this.obj[name] );
        }
        else
        {
            return Maybe.nothing();
        }
    }

    typedFetchObject<T>(name : string) : MaybePartial<T>
    {
        return maybePartial(this.typedFetch<() => Partial<T>>(name).lift(f => f()).useDefault({}).value);
    }
}

export function fromWindow() : IFunctionRepository
{
    return new ObjectFunctionRepository(window);
}

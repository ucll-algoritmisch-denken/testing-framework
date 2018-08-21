import { Maybe } from 'maybe';


export interface IFunctionRepository
{
    fetch(name : string) : Maybe<((...args : any[]) => any)>;

    typedFetch<T>(name : string) : Maybe<T>;
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
}

export function fromWindow() : IFunctionRepository
{
    return new ObjectFunctionRepository(window);
}

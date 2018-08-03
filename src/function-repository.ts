import _ from 'lodash';
import { Maybe } from 'maybe';


export interface IFunctionRepository
{
    fetch(name : string) : Maybe<((...args : any[]) => any)>;
}

class ObjectFunctionRepository implements IFunctionRepository
{
    constructor(private obj : any) { }

    fetch(name : string) : Maybe<((...args : any[]) => any)>
    {
        if ( _.has(this.obj, name) )
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

import _ from 'lodash';
import { IMaybe } from 'maybe';


export interface IFunctionRepository
{
    fetch(name : string) : IMaybe<((...args : any[]) => any)>;
}

class ObjectFunctionRepository implements IFunctionRepository
{
    constructor(private obj : any) { }

    fetch(name : string) : IMaybe<((...args : any[]) => any)>
    {
        if ( _.has(this.obj, name) )
        {
            return IMaybe.of( this.obj[name] );
        }
        else
        {
            return IMaybe.nothing();
        }
    }
}

export function fromWindow() : IFunctionRepository
{
    return new ObjectFunctionRepository(window);
}

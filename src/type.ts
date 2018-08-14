import * as is from 'predicates';


export interface IType<T>
{
    hasType(x : any) : x is T;

    readonly isMutable : boolean;
}


export const string = new class implements IType<string>
{
    hasType(x : any) : x is string
    {
        return is.string(x);
    }

    get isMutable() : boolean
    {
        return false;
    }
};

export const number = new class implements IType<number>
{
    hasType(x : any) : x is number
    {
        return is.number(x);
    }

    get isMutable() : boolean
    {
        return false;
    }
};

export const boolean = new class implements IType<boolean>
{
    hasType(x : any) : x is boolean
    {
        return is.boolean(x);
    }

    get isMutable() : boolean
    {
        return false;
    }
};

export const undef = new class implements IType<undefined>
{
    hasType(x : any) : x is undefined
    {
        return is.undefined(x);
    }

    get isMutable() : boolean
    {
        return false;
    }
};

export const any = new class implements IType<any>
{
    hasType(x : any) : x is any
    {
        return true;
    }

    get isMutable() : boolean
    {
        return true;
    }
};

export const empty = new class implements IType<void>
{
    hasType(x : any) : x is void
    {
        return false;
    }

    get isMutable() : boolean
    {
        return false;
    }
};

export function array<T>(elementType : IType<T>) : IType<T[]>
{
    return new class implements IType<T[]>
    {
        hasType(x : any) : x is T[]
        {
            return is.array(x) && x.every(elt => elementType.hasType(elt));
        }

        get isMutable() : boolean
        {
            return true;
        }
    };
}

export const func = new class implements IType<(...args : any[]) => any>
{
    hasType(x : any) : x is (...args : any[]) => any
    {
        return is.function(x);
    }

    get isMutable() : boolean
    {
        return false;
    }
};

export const object = new class implements IType< { [key : string] : any } >
{
    hasType(x : any) : x is { [key : string] : any }
    {
        return is.object(x);
    }

    get isMutable() : boolean
    {
        return true;
    }
};
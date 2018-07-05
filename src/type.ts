import * as _ from 'lodash';


export interface IType<T>
{
    hasType(x : any) : x is T;

    readonly isMutable : boolean;
}


export const string = new class implements IType<string>
{
    hasType(x : any) : x is string
    {
        return _.isString(x);
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
        return _.isNumber(x);
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
        return _.isBoolean(x);
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
        return _.isUndefined(x);
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
            return _.isArray(x) && x.every(elt => elementType.hasType(elt));
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
        return _.isFunction(x);
    }

    get isMutable() : boolean
    {
        return false;
    }
};
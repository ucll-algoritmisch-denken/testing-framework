export function isString(x : any) : x is string
{
    return typeof x === 'string';
}

export function isArray(x : any) : x is any[]
{
    return Array.isArray(x);
}

export function isNumber(x : any) : x is number
{
    return typeof x === typeof 0;
}

export function isBoolean(x : any) : x is boolean
{
    return typeof x === typeof true;
}

export function isUndefined(x : any) : x is undefined
{
    return typeof x === typeof undefined;
}

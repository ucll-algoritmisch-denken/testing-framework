import * as _ from 'lodash';


export function isString(x : any) : x is string
{
    return _.isString(x);
}

export function isArray(x : any) : x is any[]
{
    return _.isArray(x);
}

export function isNumber(x : any) : x is number
{
    return _.isNumber(x);
}

export function isInteger(x : any) : x is number
{
    return _.isInteger(x);
}

export function isBoolean(x : any) : x is boolean
{
    return _.isBoolean(x);
}

export function isUndefined(x : any) : x is undefined
{
    return _.isUndefined(x);
}

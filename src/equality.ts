import isEqual from 'lodash.isequal';


export function deepEqual(x : any, y : any) : boolean
{
    return isEqual(x, y);
}

export function approximately(x : number, y : number, epsilon : number = 0.0001) : boolean
{
    return Math.abs(x - y) < epsilon;
}
import { isEqual } from 'lodash';


export function deepEqual(x : any, y : any) : boolean
{
    return isEqual(x, y);
}

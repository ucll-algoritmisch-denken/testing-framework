import { isEqual } from 'lodash';
import { Maybe } from 'tsmonad';


export function deepEqual(x : any, y : any) : boolean
{
    return isEqual(x, y);
}

import { isEqual } from 'lodash';


export function createArray<T>(length : number, initializer : (i : number) => T) : T[]
{
    const result : T[] = new Array<T>(length);

    for ( let i = 0; i !== length; ++i )
    {
        result[i] = initializer(i);
    }

    return result;
}


export function repeat<T>(length : number, x : T) : T[]
{
    return createArray(length, _ => x);
}

export function isPermutation<T>(xs : T[], ys : T[], equality ?: (x : T, y : T) => boolean)
{
    const eq = equality || defaultEquality;

    if ( xs.length !== ys.length )
    {
        return false;
    }
    else
    {
        const used = repeat(xs.length, false);
        
        for ( const x of xs )
        {
            let found = false;
            let i = 0;

            while ( !found && i < ys.length )
            {
                if ( !used[i] && eq(x, ys[i]) )
                {
                    used[i] = true;
                    found = true;
                }

                ++i;
            }

            if ( !found )
            {
                return false;
            }
        }

        return true;
    }
}

export function allEqual<T>(xs : T[], equality ?: (x : T, y : T) => boolean) : boolean
{
    const eq = equality || defaultEquality;

    if ( xs.length === 0 )
    {
        return true;
    }
    else
    {
        return xs.slice(1).every(x => eq(xs[0], x));
    }
}

function defaultEquality<T>(x : T, y : T) : boolean
{
    return isEqual(x, y);
}

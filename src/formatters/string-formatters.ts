import { isArray, isString, isUndefined, isNumber, isBoolean, isFunction } from "type";
import _ from 'lodash';


export function convertToString(x : any) : string
{    
    if ( isArray(x) )
    {
        return formatArray(x);
    }
    else if ( isString(x) )
    {
        return formatString(x);
    }
    else if ( isUndefined(x) )
    {
        return 'undefined';
    }
    else if ( x === null )
    {
        return 'null';
    }
    else if ( isNumber(x) )
    {
        return x.toString();
    }
    else if ( isBoolean(x) )
    {
        return x.toString();
    }
    else if ( isFunction(x) )
    {
        return x.toString();
    }
    else
    {
        throw new Error(`Could not determine type of ${x}`);
    }

    function formatArray(xs : any[]) : string
    {
        const formattedElements : string = _.map(xs, x => convertToString(x)).join(", ");

        return `[${formattedElements}]`;
    }

    function formatString(x : string) : string
    {
        const nonBreakingSpaces = x.replace(/ /g, "&#9251;");

        return `"${nonBreakingSpaces}"`;
    }
}
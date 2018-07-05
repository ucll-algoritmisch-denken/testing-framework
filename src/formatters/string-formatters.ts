import * as Type from "type";
import _ from 'lodash';


export function convertToString(x : any) : string
{    
    if ( Type.array(Type.any).hasType(x) )
    {
        return formatArray(x);
    }
    else if ( Type.string.hasType(x) )
    {
        return formatString(x);
    }
    else if ( Type.undef.hasType(x) )
    {
        return 'undefined';
    }
    else if ( x === null )
    {
        return 'null';
    }
    else if ( Type.number.hasType(x) )
    {
        return x.toString();
    }
    else if ( Type.boolean.hasType(x) )
    {
        return x.toString();
    }
    else if ( Type.func.hasType(x) )
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
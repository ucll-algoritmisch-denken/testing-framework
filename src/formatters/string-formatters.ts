import * as Type from "../type";
import { map } from 'js-algorithms';


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
    else if ( Type.object.hasType(x) )
    {
        return formatObject(x);
    }
    else
    {
        throw new Error(`Could not determine type of ${x}`);
    }

    function formatArray(xs : any[]) : string
    {
        const formattedElements : string = map(xs, x => convertToString(x)).join(", ");

        return `[${formattedElements}]`;
    }

    function formatString(x : string) : string
    {
        const visibleWhitespace = x.replace(/ /g, `␣`).replace(/\n/g, `↵`);

        return `"${visibleWhitespace}"`;
    }

    function formatObject(x : { [key : string] : any }) : string
    {
        const members = Object.keys(x).map( k => {
            return `${k}: ${convertToString(x[k])}`;
        }).join(", ");

        return `{${members}}`;
    }
}
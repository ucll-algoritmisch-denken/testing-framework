import { code } from "formatters/jsx-formatters";
import { convertToString } from "formatters/string-formatters";


export abstract class Parameter<META = {}>
{
    abstract readonly canBeModifiedByFunction : boolean;

    render(value : any, _meta : META)
    {
        return code(convertToString(value));
    }
}
import { code } from "formatters/jsx-formatters";
import { convertToString } from "formatters/string-formatters";


export class ReturnValue<META = {}>
{
    render(value : any, _meta : META)
    {
        return code(convertToString(value));
    }
}
import { Maybe } from "monad";


export function evalm(input : string) : Maybe<any>
{
    try
    {
        return Maybe.just(eval(input));
    }
    catch
    {
        return Maybe.nothing();
    }
}
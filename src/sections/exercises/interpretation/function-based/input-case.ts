export abstract class InputCase<META>
{
    abstract readonly args : any[];
    
    abstract readonly meta : META;

    abstract readonly blankColumns : string[];
}
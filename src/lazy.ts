export class Lazy<T>
{
    private forced : boolean;

    private __value : T | undefined;

    constructor(private fetch : () => T)
    {
        this.forced = false;
    }

    get value() : T
    {
        this.force();

        return this.__value as T;
    }

    private force() : void
    {
        if ( !this.forced )
        {
            this.__value = this.fetch();
            this.forced = true;
        }
    }
}
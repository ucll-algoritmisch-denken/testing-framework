export abstract class Cell
{
    abstract canBeDrivenOnto : boolean;

    /**
     * Whether the sensor senses this cell.
     */
    abstract isSensed() : boolean;

    abstract isDestination() : boolean;
}

export class Wall extends Cell
{
    get canBeDrivenOnto() : boolean
    {
        return false;
    }

    isSensed() : boolean
    {
        return true;
    }

    isDestination() : boolean
    {
        return false;
    }
}

export class Empty extends Cell
{
    get canBeDrivenOnto() : boolean
    {
        return true;
    }

    isSensed() : boolean
    {
        return false;
    }

    isDestination() : boolean
    {
        return false;
    }
}

export class Destination extends Cell
{
    get canBeDrivenOnto() : boolean
    {
        return true;
    }

    isSensed() : boolean
    {
        return false;
    }

    isDestination() : boolean
    {
        return true;
    }
}

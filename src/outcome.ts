export enum Outcome
{
    Pass,
    Fail,
    Skip
}

export function combineAssertionOutcomes(rs : Outcome[])
{
    const results = [ Outcome.Pass, Outcome.Skip, Outcome.Fail ];

    return fromInt(Math.max(0, ...rs.map(result => toInt(result))));

    function toInt(x : Outcome) : number
    {
        for ( let i = 0; i !== results.length; ++i )
        {
            if ( results[i] === x )
            {
                return i;
            }
        }

        throw new Error("Invalid outcome");
    }

    function fromInt(x : number) : Outcome
    {
        return results[x];
    }
}

export function outcomeToHtmlClass(result : Outcome)
{
    if ( result === Outcome.Pass )
    {
        return 'pass';
    }
    else if ( result === Outcome.Fail )
    {
        return 'fail';
    }
    else if ( result === Outcome.Skip )
    {
        return 'skip';
    }
    else
    {
        throw new Error("Invalid AssertionResult");
    }
}

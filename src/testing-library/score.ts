export class Score
{
    constructor(public readonly grade : number, public readonly maximum : number) { }

    public add(other : Score) : Score
    {
        const grade = this.grade + other.grade;
        const maximum = this.maximum + other.maximum;

        return new Score(grade, maximum);
    }

    public scale(newMaximum : number) : Score
    {
        if ( this.maximum === 0 )
        {
            throw new Error("Cannot scale score whose maximum === 0");
        }
        else if ( newMaximum === 0 )
        {
            throw new Error("Cannot scale score to new maximum === 0");
        }
        else
        {
            const newGrade = this.grade / this.maximum * newMaximum;
            
            return new Score(newGrade, newMaximum);
        }
    }

    get isPerfect() : boolean
    {
        return this.grade === this.maximum;
    }

    static summate(...scores : Score[]) : Score
    {
        let total = new Score(0, 0);

        for ( let score of scores )
        {
            total = total.add(score);
        }

        return total;
    }
}

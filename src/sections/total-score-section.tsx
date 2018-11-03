import React from 'react';
import { Explanations } from './explanations';
import { DescriptionBox } from '../components/description-box';
import { FinishLineEntry } from '../components/section-overview/finish-line-entry';
import { ISection } from '../chapter';
import { TotalScoreEntry } from 'components/section-overview/total-score-entry';
import { Score } from 'score';


export class TotalScoreSection implements ISection
{
    constructor(private sections : ISection[]) { }

    id = 'total-score';

    get tocEntry() : JSX.Element
    {
        const scores = this.sections.map(section => {
            if ( section.isScored() )
            {
                return section.score;
            }
            else
            {
                return new Score(0, 0);
            }
        });

        const totalScore = Score.summate(...scores);

        return (
            <TotalScoreEntry totalScore={totalScore} />
        );
    }

    isScored()
    {
        return false;
    }

    hasDifficulty()
    {
        return false;
    }

    get content()
    {
        return (
            <React.Fragment>
                <p>Hello world</p>
            </React.Fragment>
        );
    }
}

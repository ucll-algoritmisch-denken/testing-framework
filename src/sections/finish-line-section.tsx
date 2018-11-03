import React from 'react';
import { Explanations } from './explanations';
import { DescriptionBox } from '../components/description-box';
import { FinishLineEntry } from '../components/section-overview/finish-line-entry';
import { ISection } from '../chapter';


export class FinishLineSection implements ISection
{
    id = 'finish';

    get tocEntry() : JSX.Element
    {
        return (
            <FinishLineEntry />
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

    protected header: JSX.Element = (
        <React.Fragment>
            Finish
        </React.Fragment>
    );

    public get content() : JSX.Element
    {
        return (
            <React.Fragment>
                <DescriptionBox>
                    Je hebt de belangrijkste oefeningen van dit labo opgelost.
                    De overige oefeningen zijn louter bedoeld als extra oefenmateriaal.
                </DescriptionBox>
            </React.Fragment>
        );
    }
}

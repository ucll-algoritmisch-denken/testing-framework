import React from 'react';
import { Explanations } from './explanations';
import { DescriptionBox } from '../components/description-box';


export class FinishLineSection extends Explanations
{
    id = 'finish';
    
    get tocEntry() : JSX.Element
    {
        return (
            <React.Fragment>
            🏁
            </React.Fragment>
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

    protected get explanations() : JSX.Element
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

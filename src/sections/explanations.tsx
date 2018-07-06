import React from 'react';
import { ISection } from '../chapter';
import './explanations.scss';
import { IScored } from '../score';
import { DescriptionBox } from 'components/description-box';


export abstract class Explanations implements ISection
{
    public abstract readonly id : string;

    public abstract readonly tocEntry: JSX.Element;

    protected abstract readonly header : JSX.Element;

    protected abstract readonly explanations : JSX.Element;

    isScored() : this is IScored
    {
        return false;
    }

    get content() : JSX.Element
    {
        return (
            <section className="explanations">
                <header>
                    {this.header}
                </header>
                <DescriptionBox>
                    {this.explanations}
                </DescriptionBox>
            </section>
        );
    }

    hasDifficulty() : boolean
    {
        return false;
    }
}

import React from 'react';
import { ISection } from '../chapter';
import './explanations.scss';
import { IScored } from '../score';
import { ExplanationEntry } from '../components/section-overview/explanation-entry';


export abstract class Explanations implements ISection
{
    public abstract readonly id : string;

    protected abstract readonly caption : string;

    protected abstract readonly header : JSX.Element;

    protected abstract readonly explanations : JSX.Element;

    public get tocEntry() : JSX.Element
    {
        return (
            <ExplanationEntry caption={this.caption} />
        );
    }

    public isScored() : this is IScored
    {
        return false;
    }

    public hasDifficulty() : boolean
    {
        return false;
    }

    public get content() : JSX.Element
    {
        return (
            <section className="explanations">
                <header>
                    {this.header}
                </header>
                {this.explanations}
            </section>
        );
    }
}

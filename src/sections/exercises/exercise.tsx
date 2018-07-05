import React from 'react';
import { ISection } from "chapter";
import { DifficultyViewer } from '../../components/difficulty-viewer';
import { IScored } from '../../score';
import { IHasDifficulty } from '../../difficulty';
import './exercise.scss';
import classNames from 'classnames';


export abstract class Exercise implements ISection
{
    public abstract readonly id : string;

    public abstract readonly tocEntry: JSX.Element;

    protected abstract header : JSX.Element;

    protected abstract exerciseContent : JSX.Element;

    public abstract hasDifficulty() : this is IHasDifficulty;

    public abstract isScored() : this is IScored;

    public get content() : JSX.Element
    {
        return (
            <section className={classNames(this.htmlClasses)}>
                <header>
                    {this.renderDifficultyViewer()} {this.header}
                </header>
                <div className="content">
                    {this.exerciseContent}
                </div>
            </section>
        );
    }

    protected renderDifficultyViewer() : JSX.Element
    {
        if ( this.hasDifficulty() )
        {
            return (
                <DifficultyViewer difficulty={this.difficulty} />
            );
        }
        else
        {
            return (
                <DifficultyViewer difficulty={null} />
            );
        }
    }

    protected get htmlClasses() : string[]
    {
        return [ "exercise" ];
    }
}

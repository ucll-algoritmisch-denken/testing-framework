import React from 'react';
import classNames from 'classnames';
import { ISection } from '../../chapter';
import { IHasDifficulty } from '../../difficulty';
import { IScored } from '../../score';
import { DifficultyViewer } from '../../components';
import './exercise.scss';


export abstract class Exercise implements ISection
{
    public abstract readonly id : string;

    public abstract readonly tocEntry: JSX.Element;

    protected abstract readonly header : JSX.Element;

    protected abstract readonly exerciseContent : JSX.Element;

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

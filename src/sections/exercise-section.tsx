import React from 'react';
import { ISection } from '../chapter';
import { ISolutionPack } from '../solution-pack';
import { parseFunction } from '../function-util';
import { IHasDifficulty } from '../difficulty';
import { IScored, Score } from '../score';
import { IExercise } from '../exercises';
import classNames from 'classnames';
import { DifficultyViewer } from '../components';


export abstract class ExerciseSection extends ISection
{
    public abstract readonly id: string;

    public abstract readonly difficulty : number;

    public abstract isScored(): this is IScored;

    public abstract hasDifficulty(): this is IHasDifficulty;

    public abstract get tocEntry() : JSX.Element;

    protected abstract readonly header : JSX.Element;

    protected abstract readonly exerciseContent : JSX.Element;

    public get content() : JSX.Element
    {
        return (
            <section className={classNames(this.htmlClasses)} tabIndex={0}>
                <header>
                    {this.renderDifficultyViewer()} {this.header}
                </header>
                <div className="content">
                    {this.exerciseContent}
                </div>
            </section>
        );
    }

    protected get htmlClasses() : string[]
    {
        return [ "exercise" ];
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

    
}
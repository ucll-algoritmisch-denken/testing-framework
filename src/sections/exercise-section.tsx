import React from 'react';
import { ISection } from '../chapter';
import { IHasDifficulty, difficulty } from '../difficulty';
import { IScored, Score } from '../score';
import classNames from 'classnames';
import { DifficultyViewer as UnstyledDifficultyViewer } from '../components';
import { ExerciseEntry } from 'components/section-overview';
import styled from 'styled-components';


const DifficultyViewer = styled(UnstyledDifficultyViewer)`
    width: 4em;
`;

const Header = styled.header`
    display: flex;
    justify-content: flex-start;
    align-items: center;
`;

export abstract class ExerciseSection implements ISection, IHasDifficulty, IScored
{
    public abstract readonly score: Score;

    public abstract readonly id: string;

    public abstract readonly difficulty : difficulty;

    public abstract readonly caption : string;

    protected abstract readonly header : JSX.Element;

    protected abstract readonly exerciseContent : JSX.Element;

    public get content() : JSX.Element
    {
        return (
            <section className={classNames(this.htmlClasses)}>
                <Header>
                    {this.renderDifficultyViewer()} {this.header}
                </Header>
                <div className="content">
                    {this.exerciseContent}
                </div>
            </section>
        );
    }

    public get tocEntry() : JSX.Element
    {
        return (
            <ExerciseEntry difficulty={this.difficulty} score={this.score} caption={this.caption} />
        );
    }

    public isScored(): this is IScored
    {
        return true;
    }

    public hasDifficulty(): this is IHasDifficulty
    {
        return true;
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
                <React.Fragment />
            );
        }
    }
}
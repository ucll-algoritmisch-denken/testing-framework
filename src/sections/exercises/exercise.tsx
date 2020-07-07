import React from 'react';
import classNames from 'classnames';
import { ISection } from '../../chapter';
import { IHasDifficulty } from '../../difficulty';
import { IScored } from '../../score';
import { DifficultyViewer as UnstyledDifficultyViewer } from '../../components';
import './exercise.scss';
import styled from 'styled-components';


const DifficultyViewer = styled(UnstyledDifficultyViewer)`
    width: 4em;
`;

const InvisibleDifficultyViewer = styled(DifficultyViewer)`
    visibility: hidden;
`;

const Header = styled.header`
    display: flex;
    justify-content: flex-start;
    align-items: center;
`;

// TODO Get rid of this class, has been replaced by ExerciseSection
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
                <Header>
                    {this.renderDifficultyViewer()} {this.header}
                </Header>
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
                <InvisibleDifficultyViewer difficulty={1} />
            );
        }
    }

    protected get htmlClasses() : string[]
    {
        return [ "exercise" ];
    }
}

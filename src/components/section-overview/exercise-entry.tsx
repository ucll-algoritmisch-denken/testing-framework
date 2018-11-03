import React from 'react';
import { Score } from 'score';
import styled from 'styled-components';
import { DifficultyViewer, InvisibleDifficultyViewer } from './difficulty-viewer';
import { ScoreViewer, InvisibleScoreViewer } from './score-viewer';
import { difficulty } from '../../difficulty';


const Container = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: stretch;
`;

const Caption = styled.div`
    min-width: 10em;
    text-align: center;
    font-variant: small-caps;
    color: white;
    padding: 2px 0.5em;
    cursor: pointer;
    user-select: none;
    margin: 1px;
    background: black;

    &:hover {
        background: #444;
    }
`;

interface IProps
{
    difficulty : difficulty;

    caption : string;

    score : Score;

    className?: string;
}

interface IState
{

}


/**
 * Entry appearing in section overview. Shows difficulty, name and score.
 */
export class ExerciseEntry extends React.Component<IProps, IState>
{
    constructor(props: IProps)
    {
        super(props);
    }

    render()
    {
        const me = this;

        return (
            <Container className={this.props.className}>
                {renderDifficulty()}
                {renderCaption()}
                {renderScore()}
            </Container>
        );

        function renderCaption() : JSX.Element
        {
            return (
                <Caption>{me.props.caption}</Caption>
            );
        }

        function renderDifficulty()
        {
            return (
                <DifficultyViewer difficulty={me.props.difficulty} />
            );
        }

        function renderScore()
        {
            return (
                <ScoreViewer score={me.props.score} />
            );
        }
    }
}

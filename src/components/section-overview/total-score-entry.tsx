import React from 'react';
import { Score } from 'score';
import { ISection, selectScoredSections } from 'chapter';
import styled from 'styled-components';
import { ScoreViewer } from './score-viewer';


const Container = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
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
`;

interface IProps
{
    totalScore : Score;
}

interface IState
{

}

export class TotalScoreEntry extends React.Component<IProps, IState>
{
    constructor(props: IProps)
    {
        super(props);
    }

    render()
    {
        return (
            <Container>
                <Caption>Total</Caption>
                <ScoreViewer score={this.props.totalScore} />
            </Container>
        );
    }
}

import React from 'react';
import { Score } from 'score';
import { ISection, selectScoredSections } from 'chapter';
import styled from 'styled-components';
import { ScoreViewer } from './score-viewer';
import { SectionEntry } from './section-entry';
import { Entry } from './entry';


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

class TotalEntryComponent extends React.Component<IProps, IState>
{
    constructor(props: IProps)
    {
        super(props);
    }

    render()
    {
        const me = this;

        return (
            <Container>
                <Caption>Total</Caption>
                <ScoreViewer score={this.props.totalScore} />
            </Container>
        );
    }
}


export class TotalEntry extends Entry
{
    constructor(public totalScore : Score) { super(); }

    render() : JSX.Element
    {
        return (
            <TotalEntryComponent totalScore={this.totalScore} />
        );
    }

    public isSection() : this is SectionEntry
    {
        return false;
    }
}
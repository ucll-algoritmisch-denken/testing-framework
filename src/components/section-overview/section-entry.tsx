import React from 'react';
import { Score } from 'score';
import { ISection, selectScoredSections } from 'chapter';
import styled from 'styled-components';
import { DifficultyViewer, InvisibleDifficultyViewer } from './difficulty-viewer';
import { ScoreViewer, InvisibleScoreViewer } from './score-viewer';
import { Entry } from './entry';


const Container = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: stretch;
`;

const Caption = styled.div<{ selected: boolean }>`
    min-width: 10em;
    text-align: center;
    font-variant: small-caps;
    color: white;
    padding: 2px 0.5em;
    cursor: pointer;
    user-select: none;
    margin: 1px;
    background: ${props => props.selected ? '#AAF' : 'black'};

    &:hover {
        background: ${props => props.selected ? '#AAF' : '#444'};
    }
`;

interface IProps
{
    section: ISection;

    className?: string;

    selected: boolean;
}

interface IState
{

}

class SectionEntryComponent extends React.Component<IProps, IState>
{
    constructor(props: IProps)
    {
        super(props);
    }

    render()
    {
        const me = this;
        const section = this.props.section;

        return (
            <Container className={this.props.className}>
                {renderDifficulty()}
                <Caption selected={this.props.selected}>{section.tocEntry}</Caption>
                {renderScore()}
            </Container>
        );

        function renderDifficulty()
        {
            if (section.hasDifficulty())
            {
                return (
                    <DifficultyViewer difficulty={section.difficulty} />
                );
            }
            else
            {
                return (
                    <InvisibleDifficultyViewer difficulty={0} />
                );
            }
        }

        function renderScore()
        {
            if (section.isScored())
            {
                return (
                    <ScoreViewer score={section.score} />
                );
            }
            else
            {
                return <InvisibleScoreViewer score={new Score(1, 1)} />;
            }
        }
    }
}


export class SectionEntry extends Entry
{
    constructor(public section : ISection) { super(); }

    render() : JSX.Element
    {
        return <SectionEntryComponent section={this.section} selected={false} />;
    }

    public isSection() : this is SectionEntry
    {
        return true;
    }
}
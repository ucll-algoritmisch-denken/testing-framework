import React from 'react';
import Sidebar from 'react-sidebar';
import { ISection, IChapter, selectScoredSections } from './chapter';
import { SectionOverview } from './components/section-overview';
import styled from 'styled-components';
import { ScoreViewer as UnstyledScoreViewer } from './components';
import { Score } from './score';


export interface IProps
{
    chapter : IChapter;

    version : string;
}

export interface IState
{
    sidebarOpen : boolean;

    selectedSectionIndex : number;
}

const Title = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: fixed;
    left: 0px;
    top: 0px;
    width: 100%;
    background: black;
    color: white;
    text-align: center;
    text-transform: uppercase;
    height: 5em;
    margin: 0px;
    z-index: 1;
    user-select: none;
    cursor: pointer;
`;

const TitleCaption = styled.span`
    font-size: 5vmin;
`;

const Version = styled.span`
    font-size: 2vmin;
`;

const TopContainer = styled.div`
    position: fixed;
    top: 5em;
    left: 0px;
    bottom: 0px;
    width: 100%;
`;

const SectionContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    margin: 1em;
    outline: none;
`;

const SectionOverviewContainer = styled.div`
    position: relative;
    height: calc(100% - 50px);
    overflow-y: scroll;
`;

const ScoreViewerContainer = styled.div`
    padding: 5px;
`;

const ScoreViewer = styled(UnstyledScoreViewer)`
    height: 100%;
    width: 100%;
    font-size: 150%;
`;

export class App extends React.Component<IProps, IState> {
    constructor(props : IProps)
    {
        super(props);

        if ( props.chapter.sections.length === 0 )
        {
            throw new Error("No sections defined");
        }
        else
        {
            this.state = { selectedSectionIndex: 0, sidebarOpen: true };
        }
    }

    render() {
        const me = this;

        // tabindex required to receive key events
        return (
            <React.Fragment>
                <Title>
                    <TitleCaption>{this.props.chapter.title}</TitleCaption>
                    <Version>{this.props.version}</Version>
                </Title>
                <TopContainer onKeyDown={(e) => onKeyDown(e)} tabIndex={0}>
                    <Sidebar sidebar={renderSidebarContent()} docked={this.state.sidebarOpen}>
                        <SectionContainer key={`section-${this.state.selectedSectionIndex}`} tabIndex={0}>
                            {this.props.chapter.sections[this.state.selectedSectionIndex].content}
                        </SectionContainer>
                    </Sidebar>
                </TopContainer>
            </React.Fragment>
        );

        function renderSidebarContent()
        {
            const scores = selectScoredSections(me.props.chapter.sections).map(section => section.score);
            const totalScore = Score.summate(...scores);

            return (
                <React.Fragment>
                    <SectionOverviewContainer>
                        <SectionOverview sections={me.props.chapter.sections} onSectionSelected={(index, section) => me.onSectionSelected(index, section)} selectedSectionIndex={me.state.selectedSectionIndex} />
                    </SectionOverviewContainer>
                    <ScoreViewerContainer>
                        <ScoreViewer score={totalScore} />
                    </ScoreViewerContainer>
                </React.Fragment>
            );
        }

        function onKeyDown(e : React.KeyboardEvent<HTMLDivElement>)
        {
            if ( e.key === ' ' && e.ctrlKey )
            {
                me.setState( { sidebarOpen: !me.state.sidebarOpen } );
            }
        }
    }

    private onSectionSelected(index : number, _section : ISection)
    {
        this.setState( { selectedSectionIndex: index } );
    }
}

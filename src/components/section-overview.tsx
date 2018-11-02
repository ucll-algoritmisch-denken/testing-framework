import React from 'react';
import { Score } from 'score';
import { ISection, selectScoredSections } from 'chapter';
import './section-overview.scss';
import { ScoreViewer as UnstyledScoreViewer } from './score-viewer';
import { DifficultyViewer as UnstyledDifficultyViewer } from './difficulty-viewer';
import styled from 'styled-components';
import { IHasDifficulty } from '../difficulty';


namespace Entry
{
    const DIFFICULTY_WIDTH = '4em';

    const SCORE_WIDTH = '4em';

    const Container = styled.div`
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: stretch;
    `;

    const DifficultyViewer = styled(UnstyledDifficultyViewer)`
        width: ${DIFFICULTY_WIDTH};
        background: black;
        color: white;
        margin: 1px;
    `;

    const ScoreViewer = styled(UnstyledScoreViewer)`
        width: ${SCORE_WIDTH};
        margin: 1px;
    `;

    const Caption = styled.div<{selected: boolean}>`
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

    export interface IProps
    {
        section : ISection;

        onSectionSelected : () => void;

        className ?: string;

        selected : boolean;
    }

    export interface IState
    {

    }

    export class Component extends React.Component<IProps, IState>
    {
        constructor(props : IProps)
        {
            super(props);
        }

        render()
        {
            const me = this;
            const section = this.props.section;

            return (
                <Container className={this.props.className} onClick={onClick}>
                    {renderDifficulty()}
                    <Caption selected={this.props.selected}>{section.tocEntry}</Caption>
                    {renderScore()}
                </Container>
            );


            function onClick()
            {
                me.props.onSectionSelected();
            }

            function renderDifficulty()
            {
                if ( section.hasDifficulty() )
                {
                    return (
                        <DifficultyViewer difficulty={section.difficulty} />
                    );
                }
                else
                {
                    const Dummy = styled.span`
                        width: ${DIFFICULTY_WIDTH};
                    `;

                    return <Dummy />;
                }
            }

            function renderScore()
            {
                if ( section.isScored() )
                {
                    return (
                        <ScoreViewer score={section.score} />
                    );
                }
                else
                {
                    const Dummy = styled.span`
                        width: ${SCORE_WIDTH};
                    `;

                    return <Dummy />;
                }
            }
        }
    }
}


export interface IProps
{
    sections : ISection[];

    onSectionSelected : (index : number, section : ISection) => void;

    className ?: string;
}

export interface IState
{
    selectedIndex : number;
}

const TopLevelContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-contents: flex-start;
    align-items: stretch;
`;

export class SectionOverview extends React.Component<IProps, IState>
{
    constructor(props : IProps)
    {
        super(props);

        this.state = { selectedIndex: 0 };
    }

    render()
    {
        const me = this;

        return (
            <TopLevelContainer className={this.props.className}>
                {this.props.sections.map(renderSection)}
            </TopLevelContainer>
        );

        // return (
        //     <table className="toc">
        //         <tbody>
        //             {this.props.sections.map(createRow)}
        //             {createTotal()}
        //         </tbody>
        //     </table>
        // );


        function renderSection(section : ISection, index : number) : JSX.Element
        {
            return (
                <Entry.Component section={section} onSectionSelected={onSelect} selected={me.state.selectedIndex === index} key={index} />
            );


            function onSelect()
            {
                me.setState( { selectedIndex: index } );
                me.props.onSectionSelected(index, section);
            }
        }


        // function createTotal()
        // {
        //     return (
        //         <tr className="total" key="total">
        //             <td />
        //             <td className="caption">
        //                 Total
        //             </td>
        //             <td>
        //                 <ScoreViewer score={computeTotal()} />
        //             </td>
        //         </tr>
        //     );


        //     function computeTotal()
        //     {
        //         return Score.summate( ...selectScoredSections(me.props.sections).map(section => section.score) );
        //     }
        // }

        // function createRow(section : ISection, index : number)
        // {
        //     return (
        //         <tr className={determineClass()} key={`toc-entry-${section.id}`}>
        //             {createDifficulty()}
        //             {createCaption()}
        //             {createScore()}
        //         </tr>
        //     );


        //     function determineClass()
        //     {
        //         const result = [ 'section' ];

        //         if ( index === me.state.selectedIndex )
        //         {
        //             result.push('active');
        //         }

        //         return result.join(' ');
        //     }

        //     function createDifficulty()
        //     {
        //         if ( section.hasDifficulty() )
        //         {
        //             return (
        //                 <td className="difficulty">
        //                     <DifficultyViewer difficulty={section.difficulty} />
        //                 </td>
        //             );
        //         }
        //         else
        //         {
        //             return (
        //                 <td className="difficulty" />
        //             );
        //         }
        //     }

        //     function createCaption()
        //     {
        //         return (
        //             <td className="caption" onClick={() => me.onClick(index, section)}>
        //                 {section.tocEntry}
        //             </td>
        //         );
        //     }

        //     function createScore()
        //     {
        //         if ( section.isScored() )
        //         {
        //             return (
        //                 <td className="score">
        //                     <ScoreViewer score={section.score} />
        //                 </td>
        //             );
        //         }
        //         else
        //         {
        //             return <React.Fragment />;
        //         }
        //     }
        // }
    }

    private onClick(index : number, section : ISection)
    {
        this.setState( { selectedIndex: index } );
        this.props.onSectionSelected(index, section);
    }
}
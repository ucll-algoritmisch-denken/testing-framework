import React from 'react';
import { Score } from '../../score';
import { ISection, selectScoredSections } from '../../chapter';
import styled from 'styled-components';
import { ExerciseEntry } from './exercise-entry';
import { TableOfContents } from '../table-of-contents';
import { TotalScoreSection } from '../../sections/total-score-section';

export interface IProps
{
    sections: ISection[];

    onSectionSelected: (index: number, section: ISection) => void;

    selectedSectionIndex: number;

    className?: string;
}

export interface IState
{
}

export class SectionOverview extends React.Component<IProps, IState>
{
    constructor(props: IProps)
    {
        super(props);
    }

    render()
    {
        const me = this;

        return (
            <TableOfContents<ISection> entries={this.props.sections}
                onEntrySelected={onEntrySelected}
                selectedIndex={this.props.selectedSectionIndex}
                renderEntry={(section) => section.tocEntry} />
        );


        function onEntrySelected(section: ISection, index: number)
        {
            me.props.onSectionSelected(index, section);
        }
    }
}
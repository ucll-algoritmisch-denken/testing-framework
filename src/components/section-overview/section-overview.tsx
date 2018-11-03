import React from 'react';
import { Score } from '../../score';
import { ISection, selectScoredSections } from '../../chapter';
import styled from 'styled-components';
import { SectionEntry } from './section-entry';
import { TableOfContents } from '../table-of-contents';
import { TotalEntry } from './total-entry';
import { Entry } from './entry';

export interface IProps
{
    sections : ISection[];

    onSectionSelected : (index : number, section : ISection) => void;

    selectedSectionIndex : number;

    className ?: string;
}

export interface IState
{
}

export class SectionOverview extends React.Component<IProps, IState>
{
    constructor(props : IProps)
    {
        super(props);
    }

    render()
    {
        const me = this;

        const sectionEntries = this.props.sections.map(section => new SectionEntry(section));
        const total = Score.summate( ...selectScoredSections(me.props.sections).map(section => section.score) );
        const totalEntry = new TotalEntry(total);
        const entries : Entry[] = [ ...sectionEntries, totalEntry ];

        return (
            <TableOfContents<Entry> entries={entries} onEntrySelected={onEntrySelected} selectedIndex={this.props.selectedSectionIndex} renderEntry={renderEntry} />
        );


        function onEntrySelected(entry : Entry, index : number)
        {
            if ( entry.isSection() )
            {
                me.props.onSectionSelected(index, entry.section);
            }
        }

        function renderEntry(entry : Entry)
        {
            return entry.render();
        }
    }
}
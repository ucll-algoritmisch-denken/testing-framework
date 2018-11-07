import React from 'react';
import { ISection } from '../../chapter';
import { TableOfContents } from '../table-of-contents';

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
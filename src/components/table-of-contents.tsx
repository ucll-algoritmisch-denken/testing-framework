import React from 'react';
import styled from 'styled-components';


export interface IProps<T>
{
    entries : T[];

    renderEntry(entry : T) : JSX.Element;

    onEntrySelected : (entry : T, index : number) => void;

    selectedIndex : number;

    className ?: string;
}

export interface IState
{
}

const TopLevelContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-contents: flex-start;
    align-items: stretch;
`;

const EntryContainer = styled.div<{isSelected : boolean}>`
    background: ${props => props.isSelected ? '#77F' : 'white'};
    padding: 2px 4px;
`;

export class TableOfContents<T> extends React.Component<IProps<T>, IState>
{
    constructor(props : IProps<T>)
    {
        super(props);
    }

    render()
    {
        const me = this;

        return (
            <TopLevelContainer className={this.props.className}>
                {this.props.entries.map(renderEntry)}
            </TopLevelContainer>
        );

        function renderEntry(entry : T, index : number) : JSX.Element
        {
            return (
                <EntryContainer key={index} onClick={onClick} isSelected={me.props.selectedIndex === index}>
                    {me.props.renderEntry(entry)}
                </EntryContainer>
            );


            function onClick()
            {
                me.props.onEntrySelected(entry, index);
            }
        }
    }
}
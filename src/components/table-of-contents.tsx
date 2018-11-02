import React from 'react';
import styled from 'styled-components';


export interface IEntry
{
    render() : JSX.Element;
}

export interface IProps<T extends IEntry>
{
    entries : T[];

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

export class TableOfContents<T extends IEntry> extends React.Component<IProps<T>, IState>
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
                <div key={index} onClick={onClick}>
                    {entry.render()}
                </div>
            );


            function onClick()
            {
                me.props.onEntrySelected(entry, index);
            }
        }
    }
}
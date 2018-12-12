import React from 'react';
import styled from 'styled-components';


export interface IProps
{
    content : string;
}

export interface IState
{

}

const StyledSpan = styled.span`
    font-family: 'Courier New', Courier, monospace;
`;

export class InlineCode extends React.Component<IProps, IState>
{
    public render()
    {
        return (
            <StyledSpan className="inline-code">
                {this.props.content}
            </StyledSpan>
        );
    }
}
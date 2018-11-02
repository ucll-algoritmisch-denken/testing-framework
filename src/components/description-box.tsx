import React from 'react';
import styled from 'styled-components';


export interface IProps
{
    className ?: string;
}

export interface IState
{

}

const StyledBox = styled.div`
    margin: 1em auto;
    width: 80%;
    background: #DDD;
    box-shadow: 0px 0px 20px 2px gray;
    padding: 0.5em 1em;
`;

export class DescriptionBox extends React.Component<IProps, IState>
{
    constructor(props : IProps)
    {
        super(props);
    }

    public render()
    {
        return (
            <StyledBox className={this.props.className}>
                {this.props.children}
            </StyledBox>
        );
    }
}
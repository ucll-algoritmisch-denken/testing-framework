import React from 'react';
import styled from 'styled-components';


export interface IProps
{
    className ?: string;

    header : string;
}

export interface IState
{

}

const StyledBox = styled.section`
    margin: 1em auto;
    width: 90%;
    background: #DDD;
    box-shadow: 0px 0px 20px 2px gray;

    h1 {
        margin: 0;
        padding: 0.5em;
        background: black;
        color: white;
        text-align: center;
    }
`;

const Contents = styled.div`
    padding: 0.5em;
`;

export class HeaderBox extends React.Component<IProps, IState>
{
    constructor(props : IProps)
    {
        super(props);
    }

    public render()
    {
        const me = this;

        return (
            <StyledBox className={this.props.className}>
                <h1>{me.props.header}</h1>
                <Contents>
                    {this.props.children}
                </Contents>
            </StyledBox>
        );
    }
}
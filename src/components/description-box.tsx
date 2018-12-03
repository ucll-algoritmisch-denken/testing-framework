import React from 'react';
import styled from 'styled-components';


export interface IProps
{
    className ?: string;

    header ?: string;
}

export interface IState
{

}

const StyledBox = styled.section`
    margin: 1em auto;
    width: 80%;
    background: #DDD;
    box-shadow: 0px 0px 20px 2px gray;
    padding: 0.5em 1em;

    h1 {
        padding: 0.5em;
        background: #333;
        color: white;
        text-align: center;
    }
`;

export class DescriptionBox extends React.Component<IProps, IState>
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
                {renderHeader()}
                {this.props.children}
            </StyledBox>
        );


        function renderHeader()
        {
            if ( me.props.header )
            {
                return (
                    <h1>{me.props.header}</h1>
                );
            }
            else
            {
                return <React.Fragment />;
            }
        }
    }
}
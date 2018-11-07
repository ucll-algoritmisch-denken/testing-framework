import React from 'react';
import styled from 'styled-components';


const Container = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: stretch;
`;

const Caption = styled.div`
    width: 100%;
    text-align: center;
    font-variant: small-caps;
    color: black;
    padding: 2px 0.5em;
    cursor: pointer;
    user-select: none;
    margin: 1px;
    background: #CCF;

    &:hover {
        background: #88F;
    }
`;

interface IProps
{
    caption : string;

    className?: string;
}

interface IState
{

}


export class ExplanationEntry extends React.Component<IProps, IState>
{
    constructor(props: IProps)
    {
        super(props);
    }

    render()
    {
        const me = this;

        return (
            <Container className={this.props.className}>
                {renderCaption()}
            </Container>
        );

        function renderCaption() : JSX.Element
        {
            return (
                <Caption>{me.props.caption}</Caption>
            );
        }
    }
}

import React from 'react';
import * as ATF from 'algo-testing-framework';
import { range } from 'js-algorithms';
import { styled } from 'algo-testing-framework';


export interface Props
{
    className ?: string;

    signature : string;
}

const Container = styled.div`
    width: 80%;
    margin: 1em auto;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;
    border: 5px solid #44F;
    border-radius: 5px;
    box-shadow: #BBF 5px 5px;
`;

const Header = styled.div`
    font-family: 'Courier New', Courier, monospace;
    font-size: 125%;
    background: #44F;
    color: white;
    padding: 0.2em;
`;

export class FunctionSummary extends React.Component<Props>
{
    render() : JSX.Element
    {
        return (
            <Container className={this.props.className}>
                <Header>
                    {this.props.signature}
                </Header>
                {this.props.children}
            </Container>
        )
    }
}

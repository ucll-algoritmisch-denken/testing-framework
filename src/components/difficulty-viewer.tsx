import React from 'react';
import { difficulty } from '../difficulty';
import styled from 'styled-components';


export interface IProps
{
    difficulty : difficulty;

    className ?: string;
}

export interface IState
{

}


function difficultyToNumberColor(difficulty : number) : string
{
    return [
        '#AFA',
        '#0F0',
        '#FF0',
        '#F80',
        '#F00',
    ][difficulty-1];
}

const Container = styled.span<{ difficulty : number }>`
    background: black;
    text-align: center;
    color: ${props => difficultyToNumberColor(props.difficulty)};
    padding-top: 0.1em;
    font-size: 170%;
    font-weight: normal;
    user-select: none;
    cursor: default;
    padding: 0.1em;
`;


export class DifficultyViewer extends React.Component<IProps, IState>
{
    constructor(props : IProps)
    {
        super(props);
    }

    public render()
    {
        const difficulty = this.props.difficulty;

        return (
            <Container difficulty={difficulty}>
                {this.difficultySymbol}
            </Container>
        );
    }

    private get difficultySymbol()
    {
        return "❶❷❸❹❺".charAt(this.props.difficulty - 1);
    }
}
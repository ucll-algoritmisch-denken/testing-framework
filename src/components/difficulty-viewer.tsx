import React from 'react';
import { difficulty } from '../difficulty';
import { repeat } from 'js-algorithms';
import styled from 'styled-components';


export interface IProps
{
    difficulty : difficulty;

    className ?: string;
}

export interface IState
{

}

const StyledSpan = styled.span`
    display: inline-block;
    text-align: center;
    user-select: none;
    cursor: default;
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
        const star = '★';
        const smallStar = '⭑';
        const text = repeat<string>(difficulty, difficulty < 4 ? star : smallStar).join('');

        return (
            <StyledSpan className={this.props.className}>
                {text}
            </StyledSpan>
        );
    }
}
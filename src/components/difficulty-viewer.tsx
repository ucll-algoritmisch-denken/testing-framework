import React from 'react';
import { difficulty } from '../difficulty';
import { repeat } from 'js-algorithms';
import styled from 'styled-components';


export interface IProps
{
    difficulty : difficulty | null;

    className ?: string;
}

export interface IState
{

}

const Component = styled.span`
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
        const star = String.fromCharCode(0x2605);
        const difficulty : number = this.props.difficulty || 0;
        const difficultyString = repeat(difficulty, star);

        return (
            <Component className={this.props.className}>
                {difficultyString}
            </Component>
        );
    }
}
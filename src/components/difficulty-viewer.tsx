import React from 'react';
import { difficulty } from '../difficulty';
import Rating from 'react-rating';
import styled from 'styled-components';


export interface IProps
{
    difficulty : difficulty;

    className ?: string;
}

export interface IState
{

}


const Star = styled.span`
    background: black;
    color: white;
    user-select: none;
`;

const empty = (
    <Star>☆</Star>
);

const filled = (
    <Star>★</Star>
);

const StyledRating = styled(Rating)`
    background: black;
    margin: 1px;
`;

export class DifficultyViewer extends React.Component<IProps, IState>
{
    constructor(props : IProps)
    {
        super(props);
    }

    public render()
    {
        const difficulty = this.props.difficulty / 2;

        return (
            <StyledRating start={0} stop={3} fractions={2} readonly={true} emptySymbol={empty} fullSymbol={filled} initialRating={difficulty} className='difficulty' />
        );
    }
}
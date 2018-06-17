import React from 'react';
import * as _ from 'lodash';
import './difficulty-viewer.scss';


export interface IProps
{
    difficulty : number;
}

export interface IState
{

}

export class DifficultyViewer extends React.Component<IProps, IState>
{
    constructor(props : IProps)
    {
        super(props);
    }

    public render()
    {
        const star = String.fromCharCode(0x2605);
        const difficultyString = _.repeat(star, this.props.difficulty);

        return (
            <span className="difficulty-viewer">
                {difficultyString}
            </span>
        );
    }
}
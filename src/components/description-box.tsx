import React from 'react';
import './description-box.scss';


export interface IProps
{

}

export interface IState
{

}

export class DescriptionBox extends React.Component<IProps, IState>
{
    constructor(props : IProps)
    {
        super(props);
    }

    public render()
    {
        return (
            <div className="description">
                {this.props.children}
            </div>
        );
    }
}
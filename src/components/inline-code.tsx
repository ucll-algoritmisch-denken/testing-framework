import React from 'react';
import './inline-code.scss';


export interface IProps
{
    content : string;
}

export interface IState
{

}

export class InlineCode extends React.Component<IProps, IState>
{
    public render()
    {
        return (
            <span className="inline-code">
                {this.props.content}
            </span>
        );
    }
}
import React from 'react';
import { convertToString } from 'formatters/string-formatters';
import { code } from 'formatters/jsx-formatters';
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
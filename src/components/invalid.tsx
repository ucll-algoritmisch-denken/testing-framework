import React from 'react';
import { code } from 'formatters/jsx-formatters';
import './invalid.scss';
import { convertToString } from 'formatters/string-formatters';


export interface IProps
{
    message : string;
    value : any;
}

export interface IState
{

}

export class Invalid extends React.Component<IProps, IState>
{
    constructor(props : IProps)
    {
        super(props);
    }

    public render()
    {
        return (
            <div className="invalid">
                <div className="message">
                    {this.props.message}
                </div>
                <div className="value">
                    {code(convertToString(this.props.value))}
                </div>
            </div>
        );
    }
}
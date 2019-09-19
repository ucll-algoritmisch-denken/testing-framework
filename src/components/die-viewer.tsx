import React from 'react';
import styled from 'styled-components';
import * as Type from '../type';


export interface IProps
{
    children?: React.ReactChild;

    className ?: string;

    die : number;
}

export interface IState
{

}

class UnstyledDieViewer extends React.PureComponent<IProps, IState>
{
    constructor(props : IProps)
    {
        super(props);
    }

    render()
    {
        return (
            <span className={this.props.className}>
                {String.fromCharCode(0x2680 - 1 + this.props.die)}
            </span>
        );
    }
}

export const DieViewer = styled(UnstyledDieViewer)`
    font-size: 1.5em;
`;

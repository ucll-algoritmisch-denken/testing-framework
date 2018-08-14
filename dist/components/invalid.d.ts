import React from 'react';
import './invalid.scss';
export interface IProps {
    message: string;
    value: any;
}
export interface IState {
}
export declare class Invalid extends React.Component<IProps, IState> {
    constructor(props: IProps);
    render(): JSX.Element;
}

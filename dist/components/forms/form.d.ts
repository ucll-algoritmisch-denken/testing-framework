import React from 'react';
import './form.scss';
export interface IProps {
    className?: string;
    headers: JSX.Element[];
    rows: JSX.Element[][];
}
export interface IState {
}
export declare class Form extends React.Component<IProps, IState> {
    constructor(props: IProps);
    render(): JSX.Element;
}

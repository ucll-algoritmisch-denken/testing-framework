import React from 'react';
export interface IProps {
    dice: number[];
    className?: string;
}
export interface IState {
}
export declare class DiceViewer extends React.Component<IProps, IState> {
    constructor(props: IProps);
    render(): JSX.Element;
}

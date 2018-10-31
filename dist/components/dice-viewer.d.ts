import React from 'react';
export interface IProps {
    dice: number[];
}
export interface IState {
}
export declare class DiceViewer extends React.Component<IProps, IState> {
    constructor(props: IProps);
    render(): JSX.Element;
}

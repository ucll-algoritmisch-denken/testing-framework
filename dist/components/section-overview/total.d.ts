import React from 'react';
import { Score } from 'score';
export interface IProps {
    totalScore: Score;
}
export interface IState {
}
export declare class Total extends React.Component<IProps, IState> {
    constructor(props: IProps);
    render(): JSX.Element;
}

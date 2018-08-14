import React from 'react';
import { Score } from 'score';
import './score-viewer.scss';
export interface IProps {
    score: Score;
}
export interface IState {
}
export declare class ScoreViewer extends React.Component<IProps, IState> {
    constructor(props: IProps);
    render(): JSX.Element;
}

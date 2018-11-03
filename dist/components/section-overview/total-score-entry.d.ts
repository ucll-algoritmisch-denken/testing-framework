import React from 'react';
import { Score } from 'score';
interface IProps {
    totalScore: Score;
}
interface IState {
}
export declare class TotalScoreEntry extends React.Component<IProps, IState> {
    constructor(props: IProps);
    render(): JSX.Element;
}
export {};

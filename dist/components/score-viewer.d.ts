import React from 'react';
import { Score } from '../score';
export interface IProps {
    score: Score;
    className?: string;
}
export interface IState {
}
export declare class UnstyledScoreViewer extends React.Component<IProps, IState> {
    constructor(props: IProps);
    render(): JSX.Element;
}
export declare const ScoreViewer: import("styled-components").StyledComponent<typeof UnstyledScoreViewer, any, {}, never>;

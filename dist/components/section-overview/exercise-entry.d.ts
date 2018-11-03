import React from 'react';
import { Score } from 'score';
import { difficulty } from '../../difficulty';
interface IProps {
    difficulty: difficulty;
    caption: string;
    score: Score;
    className?: string;
}
interface IState {
}
/**
 * Entry appearing in section overview. Shows difficulty, name and score.
 */
export declare class ExerciseEntry extends React.Component<IProps, IState> {
    constructor(props: IProps);
    render(): JSX.Element;
}
export {};

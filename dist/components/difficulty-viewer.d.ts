import React from 'react';
import { difficulty } from '../difficulty';
export interface IProps {
    difficulty: difficulty | null;
    className?: string;
}
export interface IState {
}
export declare class DifficultyViewer extends React.Component<IProps, IState> {
    constructor(props: IProps);
    render(): JSX.Element;
}

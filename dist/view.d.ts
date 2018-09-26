import React from 'react';
import { IChapter } from './chapter';
import './view.scss';
export interface IProps {
    chapter: IChapter;
    version: string;
}
export interface IState {
    currentSectionIndex: number;
}
export declare class App extends React.Component<IProps, IState> {
    constructor(props: IProps);
    render(): JSX.Element;
    private onSectionSelected;
}

import React from 'react';
import { IChapter } from 'chapter';
import './app.scss';
export interface IProps {
    chapter: IChapter;
    version: string;
}
export interface IState {
    sidebarOpen: boolean;
    currentSectionIndex: number;
}
export declare class App extends React.Component<IProps, IState> {
    constructor(props: IProps);
    render(): JSX.Element;
    private onSectionSelected;
}

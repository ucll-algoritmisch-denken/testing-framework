import React from 'react';
import './tab-control.scss';
export interface ITabProps {
    label: string;
}
export declare class Tab extends React.Component<ITabProps> {
    render(): React.ReactNode;
}
export interface IProps {
}
export interface IState {
    selectedTab: number;
}
export declare class TabControl extends React.Component<IProps, IState> {
    constructor(props: IProps);
    render(): JSX.Element;
    private onTabClicked;
}

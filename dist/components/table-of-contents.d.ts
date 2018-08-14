import React from 'react';
import { ISection } from 'chapter';
import './table-of-contents.scss';
export interface IProps {
    sections: ISection[];
    onSectionSelected: (index: number, section: ISection) => void;
}
export interface IState {
    selectedIndex: number;
}
export declare class TableOfContents extends React.Component<IProps, IState> {
    constructor(props: IProps);
    render(): JSX.Element;
    private onClick;
}

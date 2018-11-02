import React from 'react';
import { ISection } from 'chapter';
import './section-overview.scss';
export interface IProps {
    sections: ISection[];
    onSectionSelected: (index: number, section: ISection) => void;
    className?: string;
}
export interface IState {
    selectedIndex: number;
}
export declare class SectionOverview extends React.Component<IProps, IState> {
    constructor(props: IProps);
    render(): JSX.Element;
    private onClick;
}

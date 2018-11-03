import React from 'react';
export interface IProps<T> {
    entries: T[];
    renderEntry(entry: T): JSX.Element;
    onEntrySelected: (entry: T, index: number) => void;
    selectedIndex: number;
    className?: string;
}
export interface IState {
}
export declare class TableOfContents<T> extends React.Component<IProps<T>, IState> {
    constructor(props: IProps<T>);
    render(): JSX.Element;
}

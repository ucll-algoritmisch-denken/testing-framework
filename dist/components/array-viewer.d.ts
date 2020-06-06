import React from 'react';
import './array-viewer.scss';
export interface IProps {
    object: {
        [key: string]: any;
    };
    renderer?: (key: string, value: any) => JSX.Element;
    classNames?: string[];
}
export interface IState {
}
export declare class ArrayViewer extends React.Component<IProps, IState> {
    constructor(props: IProps);
    render(): JSX.Element;
    protected get htmlClasses(): string[];
    protected renderEmptyObject(): JSX.Element;
    protected renderNonEmptyObject(keys: string[]): JSX.Element;
    protected renderRows(keys: string[]): JSX.Element[];
    protected renderRow(key: string, value: any): JSX.Element;
    protected renderKey(key: string): JSX.Element;
    protected renderValue(key: string, value: any): JSX.Element;
}

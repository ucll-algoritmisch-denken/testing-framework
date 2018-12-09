import React from 'react';
export interface IProps {
    object: {
        [key: string]: any;
    };
    renderer?: (key: string, value: any) => JSX.Element;
    className?: string;
}
export interface IState {
}
export declare class ObjectViewer extends React.Component<IProps, IState> {
    constructor(props: IProps);
    render(): JSX.Element;
    protected renderEmptyObject(): JSX.Element;
    protected renderNonEmptyObject(keys: string[]): JSX.Element;
    protected renderRows(keys: string[]): JSX.Element[];
    protected renderRow(key: string, value: any): JSX.Element;
    protected renderKey(key: string): JSX.Element;
    protected renderValue(key: string, value: any): JSX.Element;
}

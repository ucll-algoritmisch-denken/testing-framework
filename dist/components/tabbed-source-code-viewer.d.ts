import React from 'react';
import { SourceCode } from '../source-code';
export interface ISourceTab {
    label: string;
    sourceCode: SourceCode;
}
export interface IProps {
    children: ISourceTab[];
}
export interface IState {
}
export declare class TabbedSourceCodeViewer extends React.Component<IProps, IState> {
    constructor(props: IProps);
    render(): JSX.Element;
}

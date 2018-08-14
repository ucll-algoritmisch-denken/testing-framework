import React from 'react';
import { SourceCode } from '../source-code';
import './solution-viewer.scss';
export interface IProps {
    sourceCode: SourceCode;
}
export interface IState {
}
export declare class SolutionViewer extends React.Component<IProps, IState> {
    constructor(props: IProps);
    render(): JSX.Element;
}

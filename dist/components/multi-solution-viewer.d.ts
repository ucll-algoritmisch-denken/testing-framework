import React from 'react';
import { SourceCode } from '../source-code';
export interface IProps {
    solutions: {
        [key: string]: SourceCode;
    };
}
export interface IState {
}
/**
 * Shows multiple solutions. Each solution is associated with a label.
 *
 * If zero solutions are given, the component renders to nothing.
 */
export declare class MultiSolutionViewer extends React.Component<IProps, IState> {
    constructor(props: IProps);
    render(): JSX.Element | null;
}

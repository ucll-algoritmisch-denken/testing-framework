import React from 'react';
import { Solution } from '../solution-pack';
export interface IProps {
    solutions: Solution<any[], any>[];
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

import React from 'react';
import { functionality } from '../car-simulation';
import './car-simulation-summary.scss';
export interface IProps {
    allowedFunctionality: functionality[];
    maxSteps?: number;
}
export interface IState {
}
export declare class CarSimulationSummary extends React.Component<IProps, IState> {
    constructor(props: IProps);
    render(): JSX.Element;
}

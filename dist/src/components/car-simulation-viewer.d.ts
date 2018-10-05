import React from 'react';
import * as CarSim from '../car-simulation';
import { IAnimation } from '../animation';
export interface IProps {
    carImage: string;
    simulation: CarSim.Simulation;
    cellSize: number;
    animationSpeed: number;
}
export interface IState {
}
export declare class CarSimulationViewer extends React.Component<IProps, IState> {
    private x;
    private y;
    private theta;
    constructor(props: IProps);
    render(): JSX.Element;
    private renderFrame;
    animateTrace(): {
        x: IAnimation<number>;
        y: IAnimation<number>;
        theta: IAnimation<number>;
    };
}

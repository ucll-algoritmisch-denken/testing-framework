import React from 'react';
import { functionality } from 'car-simulation';
import './car-functionality-symbol.scss';
export interface IProps {
    functionality: functionality;
}
export interface IState {
}
export declare class CarFunctionalitySymbol extends React.Component<IProps, IState> {
    constructor(props: IProps);
    render(): JSX.Element;
}

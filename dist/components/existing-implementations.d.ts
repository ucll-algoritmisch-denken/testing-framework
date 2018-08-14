import React from 'react';
import { SourceCode } from '../source-code';
import './existing-implementations.scss';
export interface IProps {
    children: SourceCode[];
}
export interface IState {
}
export declare class ExistingImplementations extends React.Component<IProps, IState> {
    render(): JSX.Element;
}

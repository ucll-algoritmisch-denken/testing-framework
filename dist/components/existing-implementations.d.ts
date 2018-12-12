import React from 'react';
import { SourceCode } from '../source-code';
export interface IProps {
    children: SourceCode[];
    className?: string;
}
export interface IState {
}
export declare class ExistingImplementations extends React.Component<IProps, IState> {
    render(): JSX.Element;
}

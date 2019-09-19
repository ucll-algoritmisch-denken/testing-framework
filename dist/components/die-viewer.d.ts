import React from 'react';
export interface IProps {
    children?: React.ReactChild;
    className?: string;
    die: number;
}
export interface IState {
}
declare class UnstyledDieViewer extends React.PureComponent<IProps, IState> {
    constructor(props: IProps);
    render(): JSX.Element;
}
export declare const DieViewer: import("styled-components").StyledComponent<typeof UnstyledDieViewer, any, {}, never>;
export {};

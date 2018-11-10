import React from 'react';
export interface IProps {
    colorAt: (x: number, y: number) => string | undefined;
    gridWidth: number;
    gridHeight: number;
    blockSize: number;
    padding?: number;
    className?: string;
}
export interface IState {
}
export declare class SvgColorGrid extends React.Component<IProps, IState> {
    constructor(props: IProps);
    render(): JSX.Element;
}

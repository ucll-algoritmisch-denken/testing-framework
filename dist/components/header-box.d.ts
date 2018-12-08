import React from 'react';
export interface IProps {
    className?: string;
    header: string;
}
export interface IState {
}
export declare class HeaderBox extends React.Component<IProps, IState> {
    constructor(props: IProps);
    render(): JSX.Element;
}

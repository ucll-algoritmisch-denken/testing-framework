import React from 'react';
export interface IProps {
    die: number;
}
export interface IState {
}
export declare class DieViewer extends React.Component<IProps, IState> {
    constructor(props: IProps);
    render(): JSX.Element;
    static propTypes: {
        die: (props: any, propName: string, componentName: string) => Error | undefined;
    };
}

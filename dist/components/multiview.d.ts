import React from 'react';
export interface IProps {
}
export interface IState {
    selectedTabIndex: number;
}
export declare class MultiView extends React.Component<IProps, IState> {
    constructor(props: IProps);
    render(): JSX.Element;
    private onClick;
    static propTypes: {
        dice: (props: any, propName: string, componentName: string) => Error | undefined;
    };
}

import * as React from 'react';
import { Bitmap } from '../imaging';
export interface IProps {
    bitmap: Bitmap;
    resize?: {
        width: number;
        height: number;
    };
}
export interface IState {
}
export declare class BitmapViewer extends React.Component<IProps, IState> {
    private canvas;
    constructor(props: IProps);
    componentDidMount(): void;
    render(): JSX.Element;
}

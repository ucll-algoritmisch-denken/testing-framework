/// <reference types="styled-components" />
import React from 'react';
export interface IProps {
    children?: React.ReactChild;
    className?: string;
    die: number;
}
export interface IState {
}
export declare const DieViewer: import("styled-components").StyledComponentClass<IProps, any, Pick<IProps, "children" | "className" | "die"> & {
    theme?: any;
}>;

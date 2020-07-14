import React from 'react';
export interface Props {
    className?: string;
    category: string;
    name?: string;
    type: string;
    children?: React.ReactNode;
}
export declare class Box extends React.Component<Props> {
    render(): JSX.Element;
}

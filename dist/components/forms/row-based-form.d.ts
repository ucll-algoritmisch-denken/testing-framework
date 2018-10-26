import React from 'react';
export interface IColumn {
    header: JSX.Element;
}
export interface IRow<COLUMN> {
    render(column: COLUMN): JSX.Element;
}
export interface IProps<COLUMN extends IColumn> {
    className?: string;
    columns: COLUMN[];
    rows: IRow<COLUMN>[];
}
export interface IState {
}
export declare class Form<COLUMN extends IColumn> extends React.Component<IProps<COLUMN>, IState> {
    constructor(props: IProps<COLUMN>);
    render(): JSX.Element;
    protected readonly headers: JSX.Element[];
    protected readonly rows: JSX.Element[][];
    protected renderRows(): JSX.Element[][];
}

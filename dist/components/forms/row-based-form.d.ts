import React from 'react';
export interface IColumn {
    /**
     * Shown in the header row of the form.
     */
    header: JSX.Element;
}
export interface IRow<COLUMN> {
    /**
     * Render the cell in the given column.
     */
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
}

import React from 'react';
export interface IColumn<COLUMN, INPUT> {
    name: COLUMN;
    header: JSX.Element;
    validate(data: INPUT, value: string): boolean;
    render(data: INPUT): JSX.Element;
}
export interface IRow<COLUMN, INPUT> {
    data: INPUT;
    blankColumns: COLUMN[];
}
export interface IProps<COLUMN, INPUT> {
    className?: string;
    columns: IColumn<COLUMN, INPUT>[];
    rows: IRow<COLUMN, INPUT>[];
}
export interface IState {
}
export declare class Form<COLUMN, INPUT> extends React.Component<IProps<COLUMN, INPUT>, IState> {
    constructor(props: IProps<COLUMN, INPUT>);
    render(): JSX.Element;
    protected readonly headers: JSX.Element[];
    protected readonly rows: JSX.Element[][];
    protected renderRows(): Iterable<JSX.Element[]>;
    protected renderRow(row: IRow<COLUMN, INPUT>): JSX.Element[];
    protected renderCell(row: IRow<COLUMN, INPUT>, column: IColumn<COLUMN, INPUT>): JSX.Element;
    protected renderBlankCell(row: IRow<COLUMN, INPUT>, column: IColumn<COLUMN, INPUT>): JSX.Element;
    protected renderVisibleCell(row: IRow<COLUMN, INPUT>, column: IColumn<COLUMN, INPUT>): JSX.Element;
}

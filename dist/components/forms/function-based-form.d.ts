import React from 'react';
import { IRow as IBaseRow, IColumn as IBaseColumn } from './column-based-form';
import { FunctionCallResults } from '../../function-util';
export declare abstract class InputCase<META = {}> {
    abstract readonly args: any[];
    abstract readonly meta: META;
    abstract readonly blankColumns: string[];
}
export declare abstract class Parameter<META = {}> {
    abstract readonly canBeModifiedByFunction: boolean;
    render(value: any, _meta: META): JSX.Element;
}
export declare class ReturnValue<META = {}> {
    render(value: any, _meta: META): JSX.Element;
}
export interface IParameters<META = {}> {
    [id: string]: Parameter<META>;
}
declare type Data<META> = {
    fcr: FunctionCallResults;
    meta: META;
};
export declare type IRow<META> = IBaseRow<string, Data<META>>;
export declare type IColumn<META> = IBaseColumn<string, Data<META>>;
export interface IProps<META> {
    className?: string;
    func: (...args: any[]) => any;
    parameters: IParameters<META>;
    returnValue: ReturnValue<META> | null;
    inputCases: InputCase<META>[];
}
export interface IState {
}
export declare class Form<META> extends React.Component<IProps<META>, IState> {
    private readonly functionInformation;
    constructor(props: IProps<META>);
    render(): JSX.Element;
    protected get rows(): IRow<META>[];
    protected createRow(input: InputCase<META>): IRow<META>;
    protected get columns(): IColumn<META>[];
    protected generateInputColumns(): Iterable<IColumn<META>>;
    protected createInputColumn(parameterIndex: number): IColumn<META>;
    protected generateReturnValueColumn(): Iterable<IColumn<META>>;
    protected generateOutputColumns(): Iterable<IColumn<META>>;
    protected createOutputColumn(parameterIndex: number): IColumn<META>;
    static nameInputParameter(parameterName: string): string;
    static nameOutputParameter(parameterName: string): string;
    static get nameReturnValue(): string;
}
export declare abstract class FormBuilder<META = {}> {
    protected abstract readonly func: (...args: any[]) => any;
    protected abstract generateCases(): Iterable<InputCase<META>>;
    /**
     * To be overriden to provide information about parameters.
     */
    protected abstract readonly parameters: {
        [key: string]: Parameter<META>;
    };
    protected abstract readonly returnValue: ReturnValue<META> | null;
    protected get className(): string;
    private get functionInformation();
    protected forwardInputCase(args: any[], meta: META): InputCase<META>;
    protected backwardInputCase(args: any[], meta: META, parameterName: string): InputCase<META>;
    build(): JSX.Element;
}
export {};

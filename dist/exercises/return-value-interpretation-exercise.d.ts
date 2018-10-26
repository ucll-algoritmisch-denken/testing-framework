/// <reference types="react" />
import { IColumn, IRow } from 'components/forms/row-based-form';
import { TypedFunctionCallResults } from 'function-util';
declare abstract class Column<Ps extends any[], R> implements IColumn {
    abstract readonly header: JSX.Element;
    abstract renderCell(fcr: TypedFunctionCallResults<Ps, R>): JSX.Element;
}
declare class Row<Ps extends any[], R> implements IRow<Column<Ps, R>> {
    private fcr;
    constructor(fcr: TypedFunctionCallResults<Ps, R>);
    render(column: Column<Ps, R>): JSX.Element;
}
export declare abstract class ReturnValueInterpretationExercise<Ps extends any[], R> {
    protected abstract readonly function: (...args: Ps) => R;
    protected abstract generateInputs(): Iterable<Ps>;
    protected readonly rows: Row<Ps, R>[];
    protected createRow(input: Ps): Row<Ps, R>;
    protected readonly columns: Column<Ps, R>[];
    protected createParameterColumns(): Column<Ps, R>[];
    protected createParameterColumn(parameterName: string): Column<Ps, R>;
    protected createReturnValueColumn(): Column<Ps, R>;
    render(): JSX.Element;
    protected equality(input: any, expected: R): boolean;
}
export {};

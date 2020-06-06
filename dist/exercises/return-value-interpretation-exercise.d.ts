/// <reference types="react" />
export declare abstract class ReturnValueInterpretationExercise<Ps extends any[], R> {
    protected abstract readonly function: (...args: Ps) => R;
    protected abstract generateInputs(): Iterable<Ps>;
    private get rows();
    private createRow;
    private get columns();
    private createParameterColumns;
    private createParameterColumn;
    protected createParameterColumnHeader(parameterName: string): JSX.Element;
    protected createReturnValueColumnHeader(): JSX.Element;
    private createReturnValueColumn;
    render(): JSX.Element;
    protected equality(input: any, expected: R): boolean;
}

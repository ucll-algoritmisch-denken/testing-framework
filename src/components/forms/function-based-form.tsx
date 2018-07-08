import React from 'react';
import _ from 'lodash';
import { Form as ColumnBasedForm, IRow as IBaseRow, IColumn as IBaseColumn } from './column-based-form';
import { code } from "formatters/jsx-formatters";
import { convertToString } from "formatters/string-formatters";
import { IFunctionCallResults, callFunction, FunctionInformation, parseFunction } from '../../function-util';
import { InlineCode } from '../inline-code';
import { evalm } from '../../evalm';
import { deepEqual } from '../../equality';


export abstract class InputCase<META>
{
    abstract readonly args : any[];
    
    abstract readonly meta : META;

    abstract readonly blankColumns : string[];
}

export abstract class Parameter<META = {}>
{
    abstract readonly canBeModifiedByFunction : boolean;

    render(value : any, _meta : META)
    {
        return code(convertToString(value));
    }
}

export class ReturnValue<META = {}>
{
    render(value : any, _meta : META)
    {
        return code(convertToString(value));
    }
}

export interface IParameters<META = {}>
{
    [id : string] : Parameter<META>;
}

type Data<META> = { fcr : IFunctionCallResults, meta : META };

export type IRow<META> = IBaseRow<string, Data<META>>;

export type IColumn<META> = IBaseColumn<string, Data<META>>;

export interface IProps<META>
{
    className ?: string;

    func : (...args : any[]) => any;

    parameters : IParameters<META>;

    returnValue : ReturnValue<META> | null;

    inputCases : InputCase<META>[];
}

export interface IState
{

}

export class Form<META> extends React.Component<IProps<META>, IState>
{
    private readonly functionInformation : FunctionInformation;

    constructor(props : IProps<META>)
    {
        super(props);

        this.functionInformation = parseFunction(props.func);
    }

    public render()
    {
        return (
            <ColumnBasedForm className={this.props.className} columns={this.columns} rows={this.rows} />
        );
    }

    protected get rows() : IRow<META>[]
    {
        return this.props.inputCases.map( inputCase => this.createRow(inputCase) );
    }

    protected createRow(input : InputCase<META>) : IRow<META>
    {
        const fcr = callFunction(this.props.func, ...input.args);

        return new class implements IRow<META> {
            get data() : { fcr : IFunctionCallResults, meta : META }
            {
                return { fcr, meta: input.meta };
            }

            get blankColumns() : string[]
            {
                return input.blankColumns;
            }
        };
    }
    
    protected get columns() : IColumn<META>[]
    {
        const inputColumns : IColumn<META>[] = Array.from(this.generateInputColumns());
        const returnValueColumn : IColumn<META>[] = Array.from(this.generateReturnValueColumn());
        const outputColumns : IColumn<META>[] = Array.from(this.generateOutputColumns());

        return inputColumns.concat(returnValueColumn, outputColumns);
    }

    protected *generateInputColumns() : Iterable<IColumn<META>>
    {
        for ( let i of _.range(0, this.functionInformation.parameterCount) )
        {
            yield this.createInputColumn(i);
        }
    }

    protected createInputColumn(parameterIndex : number) : IColumn<META>
    {
        if ( parameterIndex < 0 || parameterIndex >= this.functionInformation.parameterCount )
        {
            throw new Error(`Invalid parameter index ${parameterIndex}; should be between 0 and ${this.functionInformation.parameterCount}`);
        }
        else
        {
            const me = this;
            const parameterName = this.functionInformation.parameterNames[parameterIndex];
            const parameterInfo = this.props.parameters[parameterName];

            if ( !parameterInfo )
            {
                throw new Error(`Missing information about parameter ${parameterName}`);
            }
            else
            {
                return new class implements IColumn<META> {
                    get name() : string
                    {
                        return Form.nameInputParameter(parameterName);
                    }

                    get header() : JSX.Element
                    {
                        return (
                            <React.Fragment>
                                {parameterName}
                            </React.Fragment>
                        );
                    }

                    validate(data : { fcr: IFunctionCallResults, meta: META }, value : string) : boolean
                    {
                        return evalm(value).caseOf({
                            just: validate,
                            nothing: () => false
                        });


                        function validate(x : any) : boolean
                        {
                            const args = data.fcr.argumentsBeforeCall.slice();
                            args.splice(parameterIndex, 1, x);

                            const toBeChecked = {
                                func: me.props.func,
                                argumentsBeforeCall: args,
                                argumentsAfterCall: data.fcr.argumentsAfterCall,
                                returnValue: data.fcr.returnValue
                            };

                            const ignoredParameters = me.functionInformation.parameterNames.filter( (pn, i) => {
                                const info = me.props.parameters[pn];

                                return i === parameterIndex && !info.canBeModifiedByFunction;
                            } );

                            return me.functionInformation.verifyCall(toBeChecked, ignoredParameters);
                        }
                    }

                    render(data : { fcr : IFunctionCallResults, meta : META }) : JSX.Element
                    {
                        return parameterInfo.render(data.fcr.argumentsBeforeCall[parameterIndex], data.meta);
                    }
                };
            }
        }
    }

    protected *generateReturnValueColumn() : Iterable<IColumn<META>>
    {
        if ( this.props.returnValue )
        {
            const me = this;

            yield new class implements IColumn<META> {
                get name() : string
                {
                    return Form.nameReturnValue;
                }

                get header() : JSX.Element
                {
                    return (
                        <React.Fragment>
                            return value
                        </React.Fragment>
                    );
                }

                validate(data : { fcr : IFunctionCallResults, meta : META }, value : string) : boolean
                {
                    const expected = data.fcr.returnValue;

                    return evalm(value).caseOf({
                        just: x => deepEqual(x, expected),
                        nothing: () => false
                    });
                }

                render(data : { fcr : IFunctionCallResults, meta : META }) : JSX.Element
                {
                    if ( me.props.returnValue )
                    {
                        return me.props.returnValue.render(data.fcr.returnValue, data.meta);
                    }
                    else
                    {
                        return (
                            <InlineCode content={convertToString(data.fcr.returnValue)} />
                        );
                    }
                }
            };
        }
    }

    protected *generateOutputColumns() : Iterable<IColumn<META>>
    {
        for ( let i of _.range(0, this.functionInformation.parameterCount) )
        {
            const parameterName = this.functionInformation.parameterNames[i];
            const parameterInfo = this.props.parameters[parameterName];

            if ( !parameterInfo )
            {
                throw new Error(`Missing information about parameter ${parameterName}`);
            }
            else
            {
                if ( parameterInfo.canBeModifiedByFunction )
                {
                    yield this.createOutputColumn(i);
                }
            }
        }
    }

    protected createOutputColumn(parameterIndex : number) : IColumn<META>
    {
        if ( parameterIndex < 0 || parameterIndex >= this.functionInformation.parameterCount )
        {
            throw new Error(`Invalid parameter index ${parameterIndex}; should be between 0 and ${this.functionInformation.parameterCount}`);
        }
        else
        {
            const me = this;
            const parameterName = me.functionInformation.parameterNames[parameterIndex];
            const parameterInfo = me.props.parameters[parameterName];

            if ( !parameterInfo )
            {
                throw new Error(`Missing information about parameter ${parameterName}`);
            }
            else
            {
                return new class implements IColumn<META> {
                    get name() : string
                    {
                        return Form.nameOutputParameter(parameterName);
                    }

                    get header() : JSX.Element
                    {
                        return (
                            <React.Fragment>
                                {parameterName}
                            </React.Fragment>
                        );
                    }

                    validate(data : { fcr : IFunctionCallResults, meta : META }, value : string) : boolean
                    {
                        const expected = data.fcr.argumentsAfterCall[parameterIndex];

                        return evalm(value).caseOf({
                            just: x => deepEqual(x, expected),
                            nothing: () => false
                        });
                    }

                    render(data : { fcr : IFunctionCallResults, meta : META }) : JSX.Element
                    {
                        return parameterInfo.render(data.fcr.argumentsAfterCall[parameterIndex], data.meta);
                    }
                };
            }
        }
    }

    public static nameInputParameter(parameterName : string) : string
    {
        return `in<${parameterName}>`;
    }

    public static nameOutputParameter(parameterName : string) : string
    {
        return `out<${parameterName}>`;
    }

    public static get nameReturnValue() : string
    {
        return 'return value';
    }
}

export abstract class FormBuilder<META>
{
    protected abstract readonly func : (...args : any[]) => any;

    protected abstract generateCases() : Iterable<InputCase<META>>;

    protected abstract readonly parameters : { [key : string] : Parameter<META> };

    protected abstract readonly returnValue : ReturnValue<META> | null;

    protected get className() : string
    {
        return 'form';
    }

    private get functionInformation() : FunctionInformation
    {
        // TODO Cache
        return parseFunction(this.func);
    }

    protected forwardInputCase(args : any[], meta : META) : InputCase<META>
    {
        const me = this;

        return new class extends InputCase<META> {
            get args() : any[]
            {
                return args;
            }

            get meta() : META
            {
                return meta;
            }

            get blankColumns() : string[]
            {
                const result = [];

                if ( me.returnValue )
                {
                    result.push(Form.nameReturnValue);
                }

                for ( let parameterName of me.functionInformation.parameterNames )
                {
                    const info = me.parameters[parameterName];

                    if ( !info )
                    {
                        throw new Error(`Missing information about parameter ${parameterName}`);
                    }
                    else
                    {
                        if ( info.canBeModifiedByFunction )
                        {
                            result.push(Form.nameOutputParameter(parameterName));
                        }
                    }
                }

                return result;
            }
        };
    }

    protected backwardInputCase(args : any[], meta : META, parameterName : string) : InputCase<META>
    {
        if ( !this.functionInformation.parameterWithNameExists(parameterName) )
        {
            throw new Error(`Unknown parameter ${parameterName}`);
        }
        else
        {
            const me = this;

            return new class extends InputCase<META> {
                get args() : any[]
                {
                    return args;
                }

                get meta() : META
                {
                    return meta;
                }

                get blankColumns() : string[]
                {
                    return [ Form.nameInputParameter(parameterName) ];
                }
            };
        }
    }

    public build() : JSX.Element
    {
        const func = this.func;
        const parameters = this.parameters;
        const returnValue = this.returnValue;
        const inputCases = Array.from(this.generateCases());       

        return (
            <Form className={this.className} {...{func, parameters, returnValue, inputCases}} />
        );
    }
}
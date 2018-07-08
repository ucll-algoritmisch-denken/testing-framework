import React from 'react';
import _ from 'lodash';
import { Exercise as ColumnBasedExercise, IColumn as IBaseColumn, IRow as IBaseRow } from '../column-based/exercise';
import { FunctionInformation, parseFunction, IFunctionCallResults, callFunction } from 'function-util';
import { deepEqual } from 'equality';
import { InlineCode } from 'components/inline-code';
import { convertToString } from 'formatters/string-formatters';
import { SourceCodeViewer } from 'components';
import { InputCase } from './input-case';
import { Parameter } from './parameter';
import { ReturnValue } from './return-value';
import { evalm } from 'evalm';


export interface IParameters<DATA = {}>
{
    [id : string] : Parameter<DATA>;
}

type Data<META> = { fcr : IFunctionCallResults, meta : META };

export type IRow<META> = IBaseRow<string, Data<META>>;

export type IColumn<META> = IBaseColumn<string, Data<META>>;


export abstract class Exercise<META> extends ColumnBasedExercise<string, Data<META>>
{
    private __funcInformation ?: FunctionInformation;

    protected abstract readonly func : (...args : any[]) => any;

    protected abstract generateCases() : Iterable<InputCase<META>>;

    protected abstract readonly parameters : { [key : string] : Parameter<META> };

    protected abstract readonly returnValue : ReturnValue<META> | null;

    protected abstract readonly explanations : JSX.Element;

    protected readonly showFunction = true;

    protected get htmlClasses() : string[]
    {
        return super.htmlClasses.concat('function-based');
    }

    protected get description() : JSX.Element
    {
        const me = this;

        return (
            <React.Fragment>
                {this.explanations}
                {sourceCodeViewer()}
            </React.Fragment>
        );

        function sourceCodeViewer()
        {
            if ( me.showFunction )
            {
                return (
                    <SourceCodeViewer sourceCode={me.func.toString()} />
                );
            }
            else
            {
                return <React.Fragment />;
            }
        }
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
                    result.push(me.nameReturnValue);
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
                            result.push(me.nameOutputParameter(parameterName));
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
                    return [ me.nameInputParameter(parameterName) ];
                }
            };
        }
    }

    protected *generateRows() : Iterable<IRow<META>>
    {
        for ( let input of this.generateCases() )
        {
            yield this.createRow(input);
        }
    }

    protected createRow(input : InputCase<META>) : IRow<META>
    {
        const fcr = callFunction(this.func, ...input.args);

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
    
    protected get functionInformation() : FunctionInformation
    {
        return (this.__funcInformation = this.__funcInformation || parseFunction(this.func));
    }

    protected *generateColumns() : Iterable<IColumn<META>>
    {
        yield *this.generateInputColumns();
        yield *this.generateReturnValueColumn();
        yield *this.generateOutputColumns();
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
            const parameterInfo = this.parameters[parameterName];

            if ( !parameterInfo )
            {
                throw new Error(`Missing information about parameter ${parameterName}`);
            }
            else
            {
                return new class implements IColumn<META> {
                    get name() : string
                    {
                        return me.nameInputParameter(parameterName);
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
                                func: me.func,
                                argumentsBeforeCall: args,
                                argumentsAfterCall: data.fcr.argumentsAfterCall,
                                returnValue: data.fcr.returnValue
                            };

                            const ignoredParameters = me.functionInformation.parameterNames.filter( (pn, i) => {
                                const info = me.parameters[pn];

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
        if ( this.returnValue )
        {
            const me = this;

            yield new class implements IColumn<META> {
                get name() : string
                {
                    return me.nameReturnValue;
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
                    if ( me.returnValue )
                    {
                        return me.returnValue.render(data.fcr.returnValue, data.meta);
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
            const parameterInfo = this.parameters[parameterName];

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
            const parameterInfo = me.parameters[parameterName];

            if ( !parameterInfo )
            {
                throw new Error(`Missing information about parameter ${parameterName}`);
            }
            else
            {
                return new class implements IColumn<META> {
                    get name() : string
                    {
                        return me.nameOutputParameter(parameterName);
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

    protected nameInputParameter(parameterName : string) : string
    {
        return `in<${parameterName}>`;
    }

    protected nameOutputParameter(parameterName : string) : string
    {
        return `out<${parameterName}>`;
    }

    protected get nameReturnValue() : string
    {
        return 'return value';
    }
}
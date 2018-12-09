import React from 'react';
import { convertToString as str } from '../formatters/string-formatters';
import styled from 'styled-components';



export interface IProps
{
    object : { [key : string] : any };

    renderer ?: (key : string, value : any) => JSX.Element;

    className ?: string;
}

export interface IState
{

}

const Table = styled.table`
    border-collapse: collapse;
    border: #888 1px solid;

    td {
        border: #888 1px solid;
        padding: 0.2em 0.5em;

        &:first-child {
            background: #AAA;
        }
    }

    .key {
        font-variant: small-caps;
        text-align: right;
    }

    .value {
        text-align: center;
        font-family: 'Courier New', Courier, monospace;
    }

    .empty {
        text-align: center;
        font-style: italic;
    }
`;

export class ObjectViewer extends React.Component<IProps, IState>
{
    constructor(props : IProps)
    {
        super(props);
    }

    render()
    {
        const object = this.props.object;
        const keys = Object.keys(object);

        if ( keys.length === 0 )
        {
            return this.renderEmptyObject();
        }
        else
        {
            return this.renderNonEmptyObject(keys);
        }
    }

    protected renderEmptyObject() : JSX.Element
    {
        return (
            <Table className={this.props.className}>
                <tbody>
                    <tr>
                        <td className="empty">Empty</td>
                    </tr>
                </tbody>
            </Table>
        );
    }

    protected renderNonEmptyObject(keys : string[]) : JSX.Element
    {
        return (
            <Table className={this.props.className}>
                <tbody>
                    {this.renderRows(keys)}
                </tbody>
            </Table>
        );
    }

    protected renderRows(keys : string[]) : JSX.Element[]
    {
        return keys.map( (key, index) => {
            const value = this.props.object[key];

            return (
                <tr key={`row-${index}`}>
                    {this.renderRow(key, value)}
                </tr>
            );
        } );
    }

    protected renderRow(key : string, value : any) : JSX.Element
    {
        return (
            <React.Fragment>
                <td className="key">{this.renderKey(key)}</td>
                <td className="value">{this.renderValue(key, value)}</td>
            </React.Fragment>
        );
    }

    protected renderKey(key : string) : JSX.Element
    {
        return (
            <React.Fragment>
                {key}
            </React.Fragment>
        );
    }

    protected renderValue(key : string, value : any) : JSX.Element
    {
        const renderer = this.props.renderer || defaultRenderer;

        return (
            <React.Fragment>
                {renderer(key, value)}
            </React.Fragment>
        );


        function defaultRenderer(key : string, x : any) : JSX.Element
        {
            return (
                <React.Fragment>
                    {str(x)}
                </React.Fragment>
            );
        }
    }
}

import React from 'react';
import { convertToString as str } from '../formatters/string-formatters';
import './array-viewer.scss'; 


export interface IProps
{
    object : { [key : string] : any };
    renderer ?: (key : string, value : any) => JSX.Element;
    classNames ?: string[];
}

export interface IState
{

}

export class ArrayViewer extends React.Component<IProps, IState>
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

    protected get htmlClasses() : string[]
    {
        return ["array-viewer", ...(this.props.classNames || [])];
    }

    protected renderEmptyObject() : JSX.Element
    {
        // TODO Use classNames
        return (
            <table className={this.htmlClasses.join(" ")}>
                <tr>
                    <td className="empty">Empty</td>
                </tr>
            </table>
        );
    }

    protected renderNonEmptyObject(keys : string[]) : JSX.Element
    {
        // TODO Use classNames
        return (
            <table className={this.htmlClasses.join(" ")}>
                {this.renderRows(keys)}
            </table>
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
